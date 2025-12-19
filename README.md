# 1for1 — README

**Dernière mise à jour :** 19 Décembre 2025

---

## ⚙️ Installation & Lancement
Prérequis :
- Node (14/16/18 LTS recommandé)
- Yarn ou npm
- Java + Android SDK (pour Android)
- Xcode (pour iOS, macOS uniquement)
- Android emulator ou appareil connecté

Étapes :
1. Cloner le dépôt :

   ```bash
   git clone https://github.com/ghassen94/App_Ghassen_MALLOULI.git
   cd App_Ghassen_MALLOULI
   ```

2. Installer les dépendances :

   ```bash
   npm i
   # ou
   yarn install
   ```

3. iOS (macOS) :

   ```bash
   npx pod-install ios
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

4. Android :

   ```bash
   npx react-native run-android
   ```

5. Utiliser Metro (si nécessaire) :

   ```bash
   npx react-native start
   ```


## 🧩 Technologies utilisées
- React Native (TypeScript)
- @react-native-firebase/auth
- Redux Toolkit (pour `pendingEmail`)
- React Navigation
- @react-native-clipboard/clipboard
- React Native Linking

---

## 🏛 Architecture & Comportements
Fichiers et comportements clés (état actuel) :

- `App.tsx` — navigation,

- `src/Login.tsx` —
  - Envoi du magic-link via `auth().sendSignInLinkToEmail(email, actionCodeSettings)`.
  - Stocke l'email attendu dans Redux (`setPendingEmail`).
  - **Nouveau comportement** : un `useEffect` vérifie `pendingEmail` dans le store et **redirige vers `Home`** si `pendingEmail` existe.

- `src/store/authSlice.ts` — contient `pendingEmail`, `setPendingEmail`, `clearPendingEmail`.

- `src/Home.tsx` — implémentation de `signOut()` : appelle `auth().signOut()`, `dispatch(clearPendingEmail())`, puis `navigation.replace('Login')`.

---

## 🚧 Difficultés rencontrées & solutions apportées (actualisé)
- Firebase Dynamic Links causait des conflits de version et des erreurs de build — nous avons retiré `@react-native-firebase/dynamic-links` et utilisé `Linking` + fallback manuel pour un comportement compatible et maintenable.
- Gestion du pending-email : remplacement d'AsyncStorage par Redux pour garantir qu'on sache quel email finaliser (plus sûr et testable).
---


## ⏱ Temps passé (estimation)
- Estimation : **~16 heures** pour l'implémentation initiale + corrections. (Inclut envoi des liens, migration Redux, gestion des liens via Linking, fixes de build et UX.)

---

