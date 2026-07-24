plugins {
    id("com.android.application")
}

android {
    namespace = "com.aquahomes.sentientos"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.aquahomes.sentientos"
        minSdk = 26
        targetSdk = 35
        versionCode = 2026072402
        versionName = "0.2.0-test"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
