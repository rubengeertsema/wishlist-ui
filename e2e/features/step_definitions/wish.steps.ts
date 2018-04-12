import { defineSupportCode } from 'cucumber';

import { AppNavbarPo } from '../../po/app-navbar.po';
import { AppNavbarMenuPo } from '../../po/app-navbar-menu.po';
import { AppNewWishDialogPo } from '../../po/app-new-wish-dialog.po';
import { Helpers } from '../../support/helpers';

defineSupportCode(({When, Then}) => {
  When(/^I add a new wish with title "([^"]*)" and description "([^"]*)"$/, async (title: string, description: string) => {
    await AppNavbarPo.menuButton.click();
    Helpers.waitToBeClickable(AppNavbarMenuPo.createNewWishButton).click();
    await AppNewWishDialogPo.titleInputField.sendKeys(title);
    await AppNewWishDialogPo.descriptionInputField.sendKeys(description);
    await AppNewWishDialogPo.postWishButton.click();
  });

  Then(/^the wish with title "([^"]*)" and description "([^"]*)" will be displayed$/, async () => {
    // TODO
  });
});
