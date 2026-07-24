plugins {
    id("com.android.application")
}

android {
    namespace = "com.aquahomes.sentientos"
    compileSdk = 35

    signingConfigs {
        create("aquaTestRelease") {
            storeFile = file(System.getenv("AQUA_TEST_KEYSTORE_PATH"))
            storePassword = System.getenv("AQUA_TEST_KEYSTORE_PASSWORD")
            keyAlias = System.getenv("AQUA_TEST_KEY_ALIAS")
            keyPassword = System.getenv("AQUA_TEST_KEY_PASSWORD")
            enableV1Signing = true
            enableV2Signing = true
            enableV3Signing = true
            enableV4Signing = true
        }
    }

    defaultConfig {
        applicationId = "com.aquahomes.sentientos.fold7full"
        minSdk = 26
        targetSdk = 35
        versionCode = 2026072405
        versionName = "0.3.0-functional-test"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            isDebuggable = false
            signingConfig = signingConfigs.getByName("aquaTestRelease")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
