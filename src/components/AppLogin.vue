<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    name="Username"
                    v-model="form.username"
                    label="Username"
                    type="text"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    name="email"
                    v-model="form.email"
                    label="Email"
                    type="text"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="form.password"
                    name="password"
                    label="Password"
                    type="password"
                    :rules="pwdRules"
                    :counter="6"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link to="/register">Create account ?</router-link>
                <v-spacer />
                <v-btn color="primary" @click="login">Sign In</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AppLogin",
  data() {
    return {
      valid: false,
      pwdRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("login", this.form)
          .then((response) => {
            if (response.message === "Login successful") {
              this.$toasted.success("Login Successfull", {
                theme: "bubble",
                position: "top-right",
                duration: 4000,
              });
              this.$router.push("/dashboard");
            } else {
              this.$toasted.error(response.message, {
                theme: "bubble",
                position: "top-right",
                duration: 4000,
              });
            }
          })
          .catch((e) => e);
      }
    },
  },
};
</script>
