import * as puppeteer from "puppeteer";
import {Browser} from "puppeteer";
import {Options} from "./options";
import {OptionsInterface} from "../interfaces/options";

/**
 * Singleton class (one shared instance)
 */
export class ProvisionedBrowser {

    protected _browserInstance: Browser;
    protected options: Options;

    constructor(protected userOptions: OptionsInterface) {
        this.options = new Options(userOptions);
    }

    public async getBrowserInstance(): Promise<Browser> {

        const browserWasStarted = !!this._browserInstance;

        if (!browserWasStarted) {
            this._browserInstance = await puppeteer.launch({
                headless: this.options.getRunMode(),
                ignoreHTTPSErrors: this.options.ignoreHttpErrors(),
                slowMo: this.options.slowmo || 0,
                args: [`--window-size=${this.options.getDimensions().width},${this.options.getDimensions().height}`]
            });
        }

        return this._browserInstance;
    }
}