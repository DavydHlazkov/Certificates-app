import ASN1 from "@lapo/asn1js";

 const asn1 = (file, fileName) => {
  const result = ASN1.decode(file);
  if (result.typeName() !== "SEQUENCE") {
    throw new Error(
      "Неправильна структура конверта сертифіката (очікується SEQUENCE)"
    );
  }

  return {
    idName: fileName,
    result: result.sub[0],
    commonName: result.sub[0].sub[5].sub[3].sub[0].sub[1].content(),
    issuerCN: result.sub[0].sub[3].sub[2].sub[0].sub[1].content(),
    validFrom: result.sub[0].sub[4].sub[0].content(),
    validTill: result.sub[0].sub[4].sub[1].content(),
  };
};

export default asn1