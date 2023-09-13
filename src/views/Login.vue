<template>
  <v-main
    style="
      background-color: #d9633c;
      position: relative;
      z-index: 1;
      overflow: hidden;
    "
  >
    <div>
      <img
        src="../assets/top_left.svg"
        style="position: absolute; top: -230px; left: -250px; width: 700px"
      />
      <img
        src="../assets/bottom_left.svg"
        style="position: absolute; bottom: -100px; left: -150px; width: 500px"
      />
      <img
        src="../assets/top_right.svg"
        style="position: absolute; top: -100px; right: -180px; width: 500px"
      />
      <img
        src="../assets/bottom_right.svg"
        style="position: absolute; bottom: -300px; right: -180px; width: 500px"
      />
    </div>
    <v-container class="login-container">
      <v-col md="8" lg="6">
        <!-- เดสก์ท็อป -->
        <v-card class="d-none d-sm-flex px-10">
          <v-container>
            <div class="center">
              <img width="100" src="../assets/bluetree-logo.png" />
            </div>
            <v-card-title class="my-4 text-center font-weight-bold"
              >Sign in</v-card-title
            >
            <v-card-subtitle class="text-center">
              <div>Welcome back! Enter your username and</div>
              <div>password below to sign in.</div>
            </v-card-subtitle>
            <v-card-text>
              <v-form @submit.prevent="validateForm">
                <label>Username</label>
                <v-text-field
                  v-model="username"
                  class="mt-2"
                  :class="{ 'custom-placeholder-color': true }"
                  variant="outlined"
                  placeholder="Enter your username"
                  density="comfortable"
                  rounded="lg"
                  :error-messages="usernameError"
                ></v-text-field>
                <label>Password</label>
                <v-text-field
                  v-model="password"
                  class="mt-2"
                  :class="{ 'custom-placeholder-color': true }"
                  type="password"
                  variant="outlined"
                  placeholder="Enter your password"
                  density="comfortable"
                  rounded="lg"
                  :error-messages="passwordError"
                ></v-text-field>
                <v-checkbox color="#D9633C">
                  <template v-slot:label>
                    <span class="my-checkbox">Keep me logged in</span>
                  </template>
                </v-checkbox>
                <router-link
                  to="/dashboard/order/list"
                  style="text-decoration: none"
                >
                  <v-btn
                    type="submit"
                    class="text-none mx-auto"
                    color="orange"
                    block
                    size="large"
                    variant="flat"
                  >
                    Sign in
                  </v-btn>
                </router-link>
              </v-form>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-container>
        </v-card>
        <!-- มือถือ -->
        <v-card class="d-flex d-sm-none">
          <v-container>
            <div class="center">
              <img width="100" src="../assets/bluetree-logo.png" />
            </div>
            <v-card-title class="my-4 text-center font-weight-bold"
              >Sign in</v-card-title
            >
            <div
              class="text-center"
              style="
                font-size: 16px;
                font-weight: 600;
                opacity: 1;
                color: #6a6a6a;
              "
            >
              Welcome back! Enter your username and password below to sign in.
            </div>
            <v-card-text>
              <v-form @submit.prevent="validateForm">
                <label>Username</label>
                <v-text-field
                  @input="reset_validate(0)"
                  v-model="username"
                  class="mt-2"
                  :class="{ 'custom-placeholder-color': true }"
                  variant="outlined"
                  placeholder="Enter your username"
                  density="comfortable"
                  rounded="lg"
                  :error-messages="usernameError"
                ></v-text-field>
                <label>Password</label>
                <v-text-field
                  @input="reset_validate(1)"
                  v-model="password"
                  class="mt-2"
                  :class="{ 'custom-placeholder-color': true }"
                  type="password"
                  variant="outlined"
                  placeholder="Enter your password"
                  density="comfortable"
                  rounded="lg"
                  :error-messages="passwordError"
                ></v-text-field>
                <v-checkbox color="#D9633C">
                  <template v-slot:label>
                    <span class="my-checkbox">Keep me logged in</span>
                  </template>
                </v-checkbox>
                <v-btn
                  type="submit"
                  class="text-none mx-auto"
                  color="orange"
                  block
                  size="large"
                  variant="flat"
                >
                  Sign in
                </v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore(); // Vuex store instance

const username = ref("");
const password = ref("");
const usernameError = ref("");
const passwordError = ref("");

const reset_validate = (value: Number) => {
  if (value == 0) {
    usernameError.value = "";
  } else {
    passwordError.value = "";
  }
};

const validateForm = async () => {
  // Reset error messages
  usernameError.value = "";
  passwordError.value = "";

  // Validate username and password presence
  if (!username.value) {
    usernameError.value = "Username is required";
  }
  if (!password.value) {
    passwordError.value = "Password is required";
  }

  if (!usernameError.value && !passwordError.value) {
    try {
      // Call an API action in the store to authenticate user
      await store.dispatch("auth/authenticateUser", {
        username: username.value,
        password: password.value,
      });
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh; /* Set the container height to 100% of the viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-card {
  border-radius: 25px;
  box-shadow: #d43f0d 0px 0px 10px 0px;
}
.center {
  display: flex;
  justify-content: center;
  margin: 20px 0px;
}

.v-card-title {
  font-size: 35px;
}

.v-card-subtitle {
  font-size: 16px;
  font-weight: 600;
  opacity: 1;
  color: #6a6a6a;
}

label {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
}

.custom-placeholder-color ::placeholder {
  color: #909090;
  opacity: 1;
  font-size: 14px;
  font-weight: 500;
}

.my-checkbox {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}

.v-btn {
  border-radius: 17px;
  font-size: 14px;
  font-weight: 600;
}
</style>
