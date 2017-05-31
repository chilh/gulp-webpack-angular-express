import { BillPage } from './app.po';

describe('bill App', () => {
  let page: BillPage;

  beforeEach(() => {
    page = new BillPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
