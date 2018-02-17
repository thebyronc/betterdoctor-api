import { Doc } from './../js/doc.js';
import { apiKey } from './../.env';
describe('Doc', function() {
  let doc;
  beforeEach(function() {
    doc = new Doc();
  });

  it('check getNameDoc if data is recieved', function() {
    doc.getNameDoc('laura');
    expect(setTimeout(doc.dataSize, 3000) != undefined);
  });

  it('check getPracticeDoc if data is recievedd', function() {
    doc.getPracticeDoc('obgyn');
    expect(setTimeout(doc.dataSize, 3000) != undefined);
  });

});
