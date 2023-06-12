import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { longDate } from '../functions';
import { AccessRecordType } from '../Types/AccessRecord';

//PDF style
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 18,
    marginBottom: 10
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderBottomWidth: 0,
    borderRightWidth: 0,
    padding: 5
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderBottomWidth: 0,
    borderRightWidth: 0,
    padding: 5
  },
  tableCellHeader: {
    margin: 'auto',
    fontSize: 12,
    fontWeight: 500
  },
  tableCell: {
    margin: 'auto',
    fontSize: 10
  }
});

//PDF document to which we pass the entry record
const AccessRecordPDF = ({ accessRecords }: {accessRecords: AccessRecordType[]}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Registros de acceso</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Nombre de usuario</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Localización</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Fecha de acceso</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Autorización</Text>
            </View>
          </View>
          {accessRecords.map((accessRecord: AccessRecordType, index:number) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{accessRecord.username}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{accessRecord.door_location}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{longDate(accessRecord.access_date)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{accessRecord.authorized ? 'Autorizado' : 'No autorizado'}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default AccessRecordPDF;