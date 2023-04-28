import xml2js from 'xml2js';
import fs from 'fs';
import { promisify } from 'util';

const xmlData = async file => {
	if (!file) {
		throw new Error('File is missing');
	}
	console.log("parseAdhaar",file);
	const parser = new xml2js.Parser;
	try {		
		const data = file.buffer.toString('utf-8');
		const result = await promisify(parser.parseString)(data);
		const generalInfo= result.OfflinePaperlessKyc.UidData[0].Poi[0].$;
		const addressInfo = result.OfflinePaperlessKyc.UidData[0].Poa[0].$;
		const referenceId = result.OfflinePaperlessKyc.$;

		const signature = result.OfflinePaperlessKyc.Signature[0];
		const signatureValue = signature.SignatureValue;
		const keyInfo = signature.KeyInfo[0].X509Data;
		return { generalInfo,addressInfo, referenceId, signatureValue, keyInfo };
	}
	catch(err) {
		console.log(err)
	}
};

export default xmlData;
