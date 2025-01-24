
# Material Design 3 ProGuard rules
-keep class com.google.android.material.** { *; }
-keep class androidx.compose.material3.** { *; }
-dontwarn com.google.android.material.**

# Optimization rules
-optimizations !code/simplification/arithmetic,!code/simplification/cast,!field/*,!class/merging/*
-optimizationpasses 5
-allowaccessmodification
