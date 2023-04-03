import xml2js from 'xml2js';
import fs from 'fs';
import { promisify } from 'util';

const xmlData = async filePath => {
  const parser = new xml2js.Parser
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    const result = await promisify(parser.parseString)(data);
    const generalInfo= result.OfflinePaperlessKyc.UidData[0].Poi[0].$;
	const referenceId = result.OfflinePaperlessKyc.$;

	const signature = result.OfflinePaperlessKyc.Signature[0];
	const signatureValue = signature.SignatureValue;
	const keyInfo = signature.KeyInfo[0].X509Data;
	return { generalInfo, referenceId, signatureValue, keyInfo };
  }
  catch(err) {
    console.log(err)
  }
};

// xmlData().then(generalInfo => console.log(generalInfo)).catch(err){}
export default xmlData;
