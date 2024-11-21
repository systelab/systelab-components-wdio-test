/*
 * Copyright (c) 2020 - 2024 - Instrumentation Laboratory Company and Systelab Technologies, SA. All rights reserved.
 * NOTICE:  All information contained herein is and remains the property of Instrumentation Laboratory Company and its
 * affiliates, if any.  The intellectual and technical concepts contained herein are proprietary to Instrumentation
 * Laboratory Company and its affiliates and may be covered by U.S. and foreign patents and patent applications, and/or
 * are protected by trade secret or copyright law. Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is Instrumentation Laboratory Company.
 */

import {Browser, ElementFinder, Widget} from "../../../src";


export class Toast extends Widget {
  private DEFAULT_TOAST_TIMEOUT = 10000;

  constructor() {
    super(Browser.byCSS('div:last-child > div > systelab-toast'));
  }

  public async waitToBePresent(timeout: number = this.DEFAULT_TOAST_TIMEOUT): Promise<void> {
    return this.waitUntil(async () => (await this.getText()).length > 0, timeout);
  }

  public async waitToBeDisplayed(timeout: number = this.DEFAULT_TOAST_TIMEOUT): Promise<void> {
    await super.waitToBeDisplayed(timeout);
    await this.waitUntil(async () => (await this.getText()).length > 0, timeout);
  }

  public async waitToBeNotDisplayed(timeout: number = this.DEFAULT_TOAST_TIMEOUT): Promise<void> {
    await super.waitToBeNotDisplayed(timeout);
  }

  public async getText(): Promise<string> {
    return this.byCSS('div.slab-toast > i + div').getText();
  }

  public async hasErrorIcon(): Promise<boolean> {
    return this.hasIconClass('icon-times-circle');
  }

  public async hasWarningIcon(): Promise<boolean> {
    return this.hasIconClass('icon-warning');
  }

  public async hasOKIcon(): Promise<boolean> {
    return this.hasIconClass('icon-check-circle');
  }

  public async hasInfoIcon(): Promise<boolean> {
    return this.hasIconClass('icon-info-circle');
  }

  public async waitUntilToastOKIcon(timeout: number = this.DEFAULT_TOAST_TIMEOUT): Promise<void> {
    return this.waitUntil(async () => await this.hasOKIcon(), timeout);
  }

  public async waitUntilToastWarningIcon(timeout: number = this.DEFAULT_TOAST_TIMEOUT): Promise<void> {
    return this.waitUntil(async () => await this.hasWarningIcon(), timeout);
  }

  private async hasIconClass(expectedIconClass: string): Promise<boolean> {
    const iconSelector: ElementFinder = this.byTagName('i');
    const iconClassAttribute: string = await iconSelector.getAttribute('class');
    return iconClassAttribute.includes(expectedIconClass);
  }
}
