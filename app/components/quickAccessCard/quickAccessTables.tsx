import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import PrintTab, {
  getData as getPrintData,
} from "~/components/quickAccessCard/printTab/printTab";
import MissingDocumentTab, {
  getData as getMissingDocData,
} from "./missingDocumentTab/missingDocumentTab";
import UpdatePassportTab, {
  getData as getUpdatePassportData,
} from "./updatePassport/updatePassportTab";
import { useMemo } from "react";

const quickAccessTables = () => {
  // Get data for each tab (replace with your actual data fetching if needed)
  const printData = useMemo(() => getPrintData(), []);
  const missingDocData = useMemo(() => getMissingDocData(), []);
  const updatePassportData = useMemo(() => getUpdatePassportData(), []);
  // Add more data arrays for other tabs as needed

  return (
    <>
      <Tabs defaultValue="print" className="w-full">
        <TabsList className="w-[1000px]">
          <TabsTrigger value="print">
            Print
            <span className="ml-2 bg-gray-200 rounded-full px-2 text-xs">
              {printData.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="missingDoc">
            Missing Document
            <span className="ml-2 bg-gray-200 rounded-full px-2 text-xs">
              {missingDocData.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="visaUpload">Visa Update</TabsTrigger>
          <TabsTrigger value="uploadPassport">
            Update New Passport
            <span className="ml-2 bg-gray-200 rounded-full px-2 text-xs">
              {updatePassportData.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="uploadExtendVisa">
            Upload Extend Visa After Renew Passport
          </TabsTrigger>
        </TabsList>
        <TabsContent value="print">
          <PrintTab />
        </TabsContent>
        <TabsContent value="missingDoc">
          <MissingDocumentTab />
        </TabsContent>
        <TabsContent value="visaUpload"></TabsContent>
        <TabsContent value="uploadPassport">
          <UpdatePassportTab />
        </TabsContent>
        <TabsContent value="uploadExtendVisa">
          Upload your extended visa after renewing your passport here.
        </TabsContent>
      </Tabs>
    </>
  );
};

export default quickAccessTables;
