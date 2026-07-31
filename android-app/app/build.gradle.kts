plugins {
    id("com.android.application")
}

android {
    namespace = "com.aquahomes.sentientos"
    compileSdk = 35

    signingConfigs {
        create("aquaRelease") {
            storeFile = file(System.getenv("AQUA_RELEASE_KEYSTORE_PATH"))
            storePassword = System.getenv("AQUA_RELEASE_KEYSTORE_PASSWORD")
            keyAlias = System.getenv("AQUA_RELEASE_KEY_ALIAS")
            keyPassword = System.getenv("AQUA_RELEASE_KEY_PASSWORD")
            enableV1Signing = true
            enableV2Signing = true
            enableV3Signing = true
            enableV4Signing = true
        }
    }

    defaultConfig {
        applicationId = "com.aquahomes.sentinel"
        minSdk = 26
        targetSdk = 35
        versionCode = 2026073104
        versionName = "0.5.1-carousel-widget-test"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            isDebuggable = false
            signingConfig = signingConfigs.getByName("aquaRelease")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
