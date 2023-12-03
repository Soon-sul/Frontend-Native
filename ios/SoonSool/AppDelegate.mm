#import "AppDelegate.h"
#import "RNSplashScreen.h"
#import <Firebase.h>

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  self.moduleName = @"SoonSool";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }

  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];  // 추가
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
