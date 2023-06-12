import "./CssPages/AccessRecordList.css";
import { PDFViewer } from "@react-pdf/renderer";
import { getAPIUrl } from "../functions";
import useFetch from "../useFetch";
import AccessRecordPDF from "../Components/AccessRecordPDF";

const AccessRecordList = () => {

    //This page displays or downloads a PDF document with all the input records

    const API_URL = getAPIUrl();
    const { data: accessRecords, loading, error } = useFetch(`${API_URL}/accessRecords`);

    return (
        //PDFViewer to show the PDF and AccessRecordPDF to generate the PDF
        <PDFViewer>
            <AccessRecordPDF accessRecords={accessRecords} />
        </PDFViewer>
    )
};

export default AccessRecordList;