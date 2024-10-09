const utmQueryParams =
  'utm_source=photoshop&utm_medium=plugin&utm_campaign=watermarkremoverio';
import pkgInfo from '../package.json';

export const constants = {
  userAgent: `WatermarkremoverioPlugin/${pkgInfo.version} (Photoshop)`,
  logoutDialogText: 'Are you sure you want to logout?',
  resetDialogText: 'Are you sure you want to reset token?',
  urls: {
    redirectToAppsPage: `https://console.pixelbin.io/choose-org?redirectTo=settings/apps&${utmQueryParams}`,
    redirectToDashboardPage: `https://console.pixelbin.io/choose-org?redirectTo=dashboard&${utmQueryParams}`,
    redirectToPricingPage: `https://console.pixelbin.io/choose-org?redirectTo=settings/billing/pricing&${utmQueryParams}`,

    orgPricingPage: `https://console.pixelbin.io/organization/:orgId/settings/billing/pricing?${utmQueryParams}`,

    pluginHomePage: `https://www.watermarkremover.io?${utmQueryParams}`,
    pluginDoc: `https://www.pixelbin.io/docs/integrations/photoshop/watermarkremover.io/?${utmQueryParams}`,

    apiDomain: 'https://api.pixelbin.io',
  },
};
