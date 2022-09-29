import { DateTime } from "luxon";
import { parseNordeaCopyPaste, parseOPCopyPaste } from "./bankCPParseTool";

test("parses OP data with current date extra row", () => {
  const testData = `
     to 18.10.

    Käytettävissä

    119,55

    Test Person
    -400,00

    Message for test transfer
    ke 17.10.

    K supermarket Ruoka
    -36,90
  `;

  const parsedEntries = parseOPCopyPaste(testData);
  expect(parsedEntries.length).toBe(2);

  expect(parsedEntries[0].transceiver).toBe("Test Person");
  expect(parsedEntries[0].amount).toBe(-400.0);
  let date = DateTime.fromJSDate(parsedEntries[0].date);
  expect(date.toFormat("MM-dd")).toBe("10-18");
  expect(parsedEntries[0].message).toBe("Message for test transfer");

  expect(parsedEntries[1].transceiver).toBe("K supermarket Ruoka");
  expect(parsedEntries[1].amount).toBe(-36.9);
  date = DateTime.fromJSDate(parsedEntries[1].date);
  expect(date.toFormat("MM-dd")).toBe("10-17");
  expect(parsedEntries[1].message).toBeUndefined();
});

test("parses OP data with switching month", () => {
  const testData = `
    ke 3.10.

    K supermarket Ruoka
    -6,67
    ma 1.10.

    K supermarket Ruoka
    -15,41
    syyskuu 2018
    Tulot ja menot +999,99
    pe 28.9.

    Ravintola Helsinki
    -2,50
    to 27.9.

    RAVINTOLA HELSINKI
    -0,80

  `;

  const parsedEntries = parseOPCopyPaste(testData);
  expect(parsedEntries.length).toBe(4);

  expect(parsedEntries[0].transceiver).toBe("K supermarket Ruoka");
  expect(parsedEntries[0].amount).toBe(-6.67);
  let date = DateTime.fromJSDate(parsedEntries[0].date);
  expect(date.toFormat("MM-dd")).toBe("10-03");
  expect(parsedEntries[0].message).toBeUndefined();

  expect(parsedEntries[3].transceiver).toBe("RAVINTOLA HELSINKI");
  expect(parsedEntries[3].amount).toBe(-0.8);
  date = DateTime.fromJSDate(parsedEntries[3].date);
  expect(date.toFormat("MM-dd")).toBe("09-27");
  expect(parsedEntries[3].message).toBeUndefined();
});

test("parses OP data with multiple entries on same day", () => {
  const testData = `
    ma 15.10.

    My Self Other Account
    -250,00
    
    Own transfer
    
    OP-VISA/OP-KORTTIYHTIÖ OYJ
    -1 000,00
    
    K supermarket Ruoka
    -10,75
    to 11.10.
    
    K supermarket Ruoka
    -2,60
    ke 10.10.
  `;

  const parsedEntries = parseOPCopyPaste(testData);
  expect(parsedEntries.length).toBe(4);

  expect(parsedEntries[1].transceiver).toBe("OP-VISA/OP-KORTTIYHTIÖ OYJ");
  expect(parsedEntries[1].amount).toBe(-1000.0);
  let date = DateTime.fromJSDate(parsedEntries[1].date);
  expect(date.toFormat("MM-dd")).toBe("10-15");
  expect(parsedEntries[1].message).toBeUndefined();

  expect(parsedEntries[2].transceiver).toBe("K supermarket Ruoka");
  expect(parsedEntries[2].amount).toBe(-10.75);
  date = DateTime.fromJSDate(parsedEntries[2].date);
  expect(date.toFormat("MM-dd")).toBe("10-15");
  expect(parsedEntries[2].message).toBeUndefined();
});

test("parses OP data with income", () => {
  const testData = `
    ma 15.10.
    K supermarket Ruoka
    
    -23,00
    pe 5.10.
    
    COMPANY INC
    +123,01
    ke 3.10.
    
    K supermarket Ruoka
    -6,67
    ma 1.10.
  `;

  const parsedEntries = parseOPCopyPaste(testData);
  expect(parsedEntries.length).toBe(3);

  expect(parsedEntries[0].transceiver).toBe("K supermarket Ruoka");
  expect(parsedEntries[0].amount).toBe(-23.0);

  expect(parsedEntries[1].transceiver).toBe("COMPANY INC");
  expect(parsedEntries[1].amount).toBe(123.01);
});

test("parses OP data with switching year", () => {
  const testData = `
    ke 3.1.

    K supermarket Ruoka
    -6,67
    ma 1.1.

    K supermarket Ruoka
    -15,41
    joulukuu 2017
    Tulot ja menot +999,99
    pe 28.12.

    Ravintola Helsinki
    -2,50
    to 27.12.

    RAVINTOLA HELSINKI
    -0,80

  `;

  const parsedEntries = parseOPCopyPaste(testData);
  expect(parsedEntries.length).toBe(4);

  expect(parsedEntries[0].transceiver).toBe("K supermarket Ruoka");
  expect(parsedEntries[0].amount).toBe(-6.67);
  let date = DateTime.fromJSDate(parsedEntries[0].date);
  expect(date.toFormat("yyyy-MM-dd")).toBe("2018-01-03");
  expect(parsedEntries[0].message).toBeUndefined();

  expect(parsedEntries[3].transceiver).toBe("RAVINTOLA HELSINKI");
  expect(parsedEntries[3].amount).toBe(-0.8);
  date = DateTime.fromJSDate(parsedEntries[3].date);
  expect(date.toFormat("yyyy-MM-dd")).toBe("2017-12-27");
  expect(parsedEntries[3].message).toBeUndefined();
});

test("parses Nordea data", () => {
  const testData = `25.10.2018 	Itsepalvelu 	Test Name 	600,00-
    25.10.2018 	Pano 	PERSON TO PUT MONEY ON 	1.010,00+
    22.10.2018 	Pano 	PAYMENT COMPANY REFUND 	19,30+
    20.10.2018 	e-maksu 	FINNKINO OY 	6,00-`;

  const parsedEntries = parseNordeaCopyPaste(testData);
  expect(parsedEntries.length).toBe(4);

  expect(parsedEntries[0].transceiver).toBe("Test Name");
  expect(parsedEntries[0].amount).toBe(-600.0);
  let date = DateTime.fromJSDate(parsedEntries[0].date);
  expect(date.toFormat("yyyy-MM-dd")).toBe("2018-10-25");
  expect(parsedEntries[0].message).toBeUndefined();

  expect(parsedEntries[2].transceiver).toBe("PAYMENT COMPANY REFUND");
  expect(parsedEntries[2].amount).toBe(19.3);
  date = DateTime.fromJSDate(parsedEntries[2].date);
  expect(date.toFormat("yyyy-MM-dd")).toBe("2018-10-22");
  expect(parsedEntries[2].message).toBeUndefined();
});
