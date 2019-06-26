cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-open-native-settings.Settings",
        "file": "plugins/cordova-open-native-settings/www/settings.js",
        "pluginId": "cordova-open-native-settings",
        "clobbers": [
            "cordova.plugins.settings"
        ]
    },
    {
        "id": "cordova-plugin-cache-clear.CacheClear",
        "file": "plugins/cordova-plugin-cache-clear/www/CacheClear.js",
        "pluginId": "cordova-plugin-cache-clear",
        "clobbers": [
            "CacheClear"
        ]
    },
    {
        "id": "cordova-plugin-fcm.FCMPlugin",
        "file": "plugins/cordova-plugin-fcm/www/FCMPlugin.js",
        "pluginId": "cordova-plugin-fcm",
        "clobbers": [
            "FCMPlugin"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-globalization.GlobalizationError",
        "file": "plugins/cordova-plugin-globalization/www/GlobalizationError.js",
        "pluginId": "cordova-plugin-globalization",
        "clobbers": [
            "window.GlobalizationError"
        ]
    },
    {
        "id": "cordova-plugin-globalization.globalization",
        "file": "plugins/cordova-plugin-globalization/www/globalization.js",
        "pluginId": "cordova-plugin-globalization",
        "clobbers": [
            "navigator.globalization"
        ]
    },
    {
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "id": "cordova-plugin-nativestorage.mainHandle",
        "file": "plugins/cordova-plugin-nativestorage/www/mainHandle.js",
        "pluginId": "cordova-plugin-nativestorage",
        "clobbers": [
            "NativeStorage"
        ]
    },
    {
        "id": "cordova-plugin-nativestorage.LocalStorageHandle",
        "file": "plugins/cordova-plugin-nativestorage/www/LocalStorageHandle.js",
        "pluginId": "cordova-plugin-nativestorage"
    },
    {
        "id": "cordova-plugin-nativestorage.NativeStorageError",
        "file": "plugins/cordova-plugin-nativestorage/www/NativeStorageError.js",
        "pluginId": "cordova-plugin-nativestorage"
    },
    {
        "id": "cordova-plugin-apprate.AppRate",
        "file": "plugins/cordova-plugin-apprate/www/AppRate.js",
        "pluginId": "cordova-plugin-apprate",
        "clobbers": [
            "AppRate"
        ]
    },
    {
        "id": "cordova-plugin-apprate.locales",
        "file": "plugins/cordova-plugin-apprate/www/locales.js",
        "pluginId": "cordova-plugin-apprate",
        "runs": true
    },
    {
        "id": "cordova-plugin-apprate.storage",
        "file": "plugins/cordova-plugin-apprate/www/storage.js",
        "pluginId": "cordova-plugin-apprate",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-open-native-settings": "1.5.2",
    "cordova-plugin-browsersync": "0.1.7",
    "cordova-plugin-cache-clear": "1.3.7",
    "cordova-plugin-fcm": "2.1.2",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-support-google-services": "1.3.1",
    "cordova-plugin-dialogs": "2.0.1",
    "cordova-plugin-globalization": "1.11.0",
    "cordova-plugin-inappbrowser": "3.0.0",
    "cordova-plugin-nativestorage": "2.3.2",
    "cordova-plugin-apprate": "1.4.0"
};
// BOTTOM OF METADATA
});