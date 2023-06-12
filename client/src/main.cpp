#include <M5Stack.h>
#include <Wiegand.h>
#include <deque>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>

WIEGAND wg;
WiFiClientSecure client;
HTTPClient https;
std::deque<unsigned int> rawPin;

#define D0_PIN 21
#define D1_PIN 22
#define RELAY_PIN 26
#define DOOR_DELAY 2000
#define SSID "WIFI_SSID"                              // Cambiar por el nombre de la red
#define PASSWORD "WIFI_PASSWORD"                      // Cambiar por la contraseña de la red
#define API_URL "https://SERVER_IP/api/v1/authorize/" // Cambiar por la url del servidor
#define OK_CODE 13
#define ESC_CODE 27

void printRawPin(std::deque<unsigned int> rawPin);
void clearScreen();
void connectWifi();
String extractPin(std::deque<unsigned int> rawPin);
void sendRequest(String code);
void pushNumberToPin(unsigned int number);

/// @brief Setup function that is executed once at the beginning of the program
void setup()
{
  M5.begin();
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setCursor(0, 0);
  M5.Lcd.setTextColor(WHITE);
  M5.Lcd.setTextSize(2);

  wg.begin(D0_PIN, D1_PIN);

  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);

  connectWifi();
}

/// @brief Loop function that is executed continuously after the setup
void loop()
{
  // Check if there is a code available
  if (wg.available())
  {
    unsigned long code = wg.getCode();
    int type = wg.getWiegandType();

    // If the code is of type 8, it means that it is a keystroke on the keypad
    if (type == 8)
    {
      switch (code)
      {
      // If the code relates to the OK key, it means that the user has finished entering the pin
      case OK_CODE:
        if (rawPin.size() == 9)
        {
          String pin = extractPin(rawPin);
          sendRequest(pin);
        }
        break;
      // If the code relates to the ESC key, it means that the user wants to clear the pin
      case ESC_CODE:
        rawPin.clear();
        clearScreen();
        break;
      // If the code relates to any other key, it means that the user is entering the pin
      default:
        pushNumberToPin(code);
        printRawPin(rawPin);
      }
    }
    // If the code is of type 26, it means that it is a wiegand 26 card reader
    else if (type == 26)
    {
      if (rawPin.size() != 0)
      {
        rawPin.clear();
      }
      clearScreen();
      sendRequest(String(code));
    }
  }
}

/// @brief Connect to the wifi network
void connectWifi()
{
  WiFi.begin(SSID, PASSWORD);
  M5.Lcd.print("Connecting to WiFi");
  u_int8_t counter = 0;
  while (WiFi.status() != WL_CONNECTED)
  {
    if (counter > 10)
    {
      clearScreen();
      M5.Lcd.println("Connecting to WiFi");
      counter = 0;
    }
    counter++;
    delay(500);
    M5.Lcd.print(".");
  }
  clearScreen();
  M5.Lcd.println("WiFi Connected");
}

/// @brief Utility function to clear the screen
void clearScreen()
{
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setCursor(0, 0);
}

/// @brief Function to print the raw pin to the screen
void printRawPin(std::deque<unsigned int> rawPin)
{
  clearScreen();
  if (rawPin.size() == 0)
  {
    return;
  }
  for (int i = 0; i < rawPin.size(); i++)
  {
    M5.Lcd.print(rawPin[i]);
  }
  M5.Lcd.println();
}

/// @brief Function to extract the pin from the raw pin
String extractPin(std::deque<unsigned int> rawPin)
{
  // Pin is the 5 digits with 2 offset in both sides
  String pin = "";
  for (int i = 2; i < 7; i++)
  {
    pin += String(rawPin[i]);
  }
  return pin;
}

// Write LOW to the relay pin for 2 seconds to open the door and then HIGH to close it
void openDoor()
{
  digitalWrite(RELAY_PIN, LOW);
  delay(DOOR_DELAY);
  digitalWrite(RELAY_PIN, HIGH);
}

/// @brief Function to send the request to the server
void sendRequest(String code)
{
  // Check if the device is connected to the wifi network
  if (WiFi.status() == WL_CONNECTED)
  {
    client.setInsecure();
    // Begin the connection to the server
    bool conected = https.begin(client, API_URL);

    // Set the headers and the body of the request
    https.addHeader("Content-Type", "application/json");

    String DOOR_ID = "16822db5-8bfa-4060-a72b-45ab55fab1fb";
    String body = "{\"door_id\":\"" + DOOR_ID + "\",\"identification\":\"" + String(code) + "\"}";

    // Send the request
    int httpsCode = https.POST(body);

    // Check if the request was successful
    if (httpsCode > 0)
    {
      // Read the response
      String payload = https.getString();
      // Check if the response is true or false
      if (payload.endsWith("true}"))
      {
        // If the response is true, open the door
        M5.Lcd.println("Access granted");
        openDoor();
        clearScreen();
      }
      else
      {
        // If the response is false, show a message
        M5.Lcd.println("Access denied");
        delay(2000);
        clearScreen();
        rawPin.clear();
      }
    }
    else
    {
      M5.Lcd.println("Error on https request");
      M5.Lcd.println(httpsCode);
    }
    // End the connection
    https.end();
  }
}

/// @brief Function to push a number to the raw pin and keep it with a maximum size of 9 digits
void pushNumberToPin(unsigned int number)
{
  rawPin.push_back(number);
  if (rawPin.size() > 9)
  {
    rawPin.pop_front();
  }
}