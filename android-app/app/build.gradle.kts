plugins {
    id("com.android.application")
}

android {
    namespace = "com.aquahomes.sentientos"
    compileSdk = 35

    signingConfigs {
        create("aquaRelease") {
            System.getenv("AQUA_RELEASE_KEYSTORE_PATH")
                ?.takeIf { it.isNotBlank() }
                ?.let { storeFile = file(it) }
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
        versionCode = 2026080502
        versionName = "0.8.2-live-aqua-memory"
        buildConfigField(
            "String",
            "AQUA_GATEWAY_URL",
            "\"" + providers.gradleProperty("aqua.gatewayUrl")
                .orElse(providers.environmentVariable("AQUA_GATEWAY_URL"))
                .orElse("")
                .get() + "\""
        )
        buildConfigField(
            "boolean",
            "CUSTOMER_PREVIEW_SNAPSHOTS",
            providers.gradleProperty("aqua.customerPreview").orElse("false").get()
        )
        buildConfigField(
            "boolean",
            "ECOSYSTEM_PRESENTATION_MODE",
            providers.gradleProperty("aqua.ecosystemPreview").orElse("false").get()
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

dependencies {
    implementation("androidx.webkit:webkit:1.16.0")
}
