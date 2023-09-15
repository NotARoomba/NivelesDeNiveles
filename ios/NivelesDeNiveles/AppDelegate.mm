#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"  // here
#import <GoogleMaps/GoogleMaps.h>
#import "RNCConfig.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"NivelesDeNiveles";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  NSString *mapsApiKey = [RNCConfig envFor:@"GOOGLE_MAPS_IOS"];
  [GMSServices provideAPIKey: mapsApiKey]; // add this line using the api key obtained from Google Console

  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];
  // BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions];
  // if (ret == YES) {
  //   [RNSplashScreen show];
  // }
  // return ret;
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
