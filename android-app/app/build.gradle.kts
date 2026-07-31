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
        versionCode = 2026073107
        versionName = "0.5.4-command-center-message-test"
        buildConfigField(
            "boolean",
            "CUSTOMER_PREVIEW_SNAPSHOTS",
            providers.gradleProperty("aqua.customerPreview").orElse("false").get()
        )
    }

    buildFeatures {
        buildConfig = true
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
