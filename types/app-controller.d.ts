/**
 * AppController
 *
 * This will setup the main app controller.
 *
 * @class
 */
export class AppController {
    /**
     * @member {object} router
     */
    router: any;
    /**
     * @member {object} appShell
     */
    appShell: any;
    /**
     * This will setup the service worker.
     *
     * @protected
     * @returns {void}
     */
    protected setupService(): void;
    /**
     * This will setup the router.
     *
     * @protected
     * @return {void}
     */
    protected setupRouter(): void;
    /**
     * This will navigate to the uri.
     *
     * @param {string} uri
     * @param {object} [data]
     * @param {boolean} [replace=false]
     * @return {void}
     */
    navigate(uri: string, data?: object, replace?: boolean): void;
    /**
     * This will setup the app shell.
     *
     * @protected
     * @return {void}
     */
    protected setupAppShell(): void;
}
