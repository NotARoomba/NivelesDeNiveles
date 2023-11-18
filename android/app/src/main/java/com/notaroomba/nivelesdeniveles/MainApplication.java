package com.notaroomba.nivelesdeniveles;

// import com.rnfs.RNFSPackage; // FS PACKAGE

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import com.onesignal.Continue;
import com.onesignal.OneSignal;

import com.marianhello.bgloc.react.BackgroundGeolocationPackage;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new RNFSPackage());
            packages.add(new BackgroundGeolocationPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
      // Verbose Logging set to help debug issues, remove before releasing your app.
      // OneSignal.getDebug().setLogLevel(LogLevel.VERBOSE);

      // OneSignal Initialization
      OneSignal.initWithContext(this, BuildConfig.ONESIGNAL_APP_ID);

      // requestPermission will show the native Android notification permission prompt.
      // NOTE: It's recommended to use a OneSignal In-App Message to prompt instead.
      OneSignal.getNotifications().requestPermission(true, Continue.with(r -> {
          if (r.isSuccess()) {
              if (r.getData()) {
                  // `requestPermission` completed successfully and the user has accepted permission
              }
              else {
                  // `requestPermission` completed successfully but the user has rejected permission
              }
          }
          else {
              // `requestPermission` completed unsuccessfully, check `r.getThrowable()` for more info on the failure reason
          }
      }));
  }
}
