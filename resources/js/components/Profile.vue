<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-widget widget-user mt-3">
          <!-- Add the bg color to the header using any of the bg-* classes -->
          <div
            class="widget-user-header text-white"
            style="
              background: url('/img/cover2.jpg') center center;
              background-size: cover;
            "
          >
            <h3 class="widget-user-username text-right">{{ this.form.name}}</h3>
            <h5 class="widget-user-desc text-right">{{ this.form.bio }}</h5>
          </div>
          <div class="widget-user-image">
            <img class="img-circle" :src="userPhoto" alt="User Avatar" />
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">3,200</h5>
                  <span class="description-text">SALES</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">13,000</h5>
                  <span class="description-text">FOLLOWERS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4">
                <div class="description-block">
                  <h5 class="description-header">35</h5>
                  <span class="description-text">PRODUCTS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
        </div>
        <div class="card">
          <div class="card-header p-2">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link" href="#activity" data-toggle="tab"
                  >Activity</a
                >
              </li>

              <li class="nav-item">
                <a class="nav-link active" href="#settings" data-toggle="tab"
                  >Settings</a
                >
              </li>
            </ul>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane" id="activity">
                <h6>Will Have some feature</h6>
              </div>
              <!-- /.tab-pane -->

              <!-- /.tab-pane -->

              <div class="tab-pane active" id="settings">
                <form class="form-horizontal">
                  <div class="form-group row">
                    <label for="inputName" class="col-sm-2 col-form-label"
                      >Name</label
                    >
                    <div class="col-sm-10">
                      <input
                        v-model="form.name"
                        type="email"
                        class="form-control"
                        id="inputName"
                        placeholder="Name"
                        :class="{ 'is-invalid': form.errors.has('name') }"
                      />
                      <has-error :form="form" field="name"></has-error>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputEmail" class="col-sm-2 col-form-label"
                      >Email</label
                    >
                    <div class="col-sm-10">
                      <input
                        v-model="form.email"
                        type="email"
                        class="form-control"
                        id="inputEmail"
                        placeholder="Email"
                        :class="{ 'is-invalid': form.errors.has('email') }"
                      />
                      <has-error :form="form" field="email"></has-error>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputExperience" class="col-sm-2 col-form-label"
                      >Experience</label
                    >
                    <div class="col-sm-10">
                      <textarea
                        v-model="form.bio"
                        class="form-control"
                        id="inputExperience"
                        placeholder="Experience"
                        :class="{ 'is-invalid': form.errors.has('bio') }"
                      ></textarea>
                      <has-error :form="form" field="bio"></has-error>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="file" class="col-sm-2 col-form-label"
                      >Upload Photo</label
                    >
                    <div class="col-sm-10">
                      <input
                        type="file"
                        name="photo"
                        @change="updatePhoto"
                        id="file"
                        :class="{ 'is-invalid': form.errors.has('photo') }"
                      />
                      <has-error :form="form" field="photo"></has-error>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputName2" class="col-sm-2 col-form-label"
                      >Password</label
                    >
                    <div class="col-sm-10">
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"
                        v-model="form.password"
                        placeholder="Change password"
                        :class="{ 'is-invalid': form.errors.has('password') }"
                      />
                      <has-error :form="form" field="password"></has-error>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="offset-sm-2 col-sm-10">
                      <button
                        type="submit"
                        @click.prevent="updateProfile"
                        class="btn btn-success"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- /.card-body -->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped></style>
<script>
export default {
  data() {
    return {
      userPhoto: "",
      form: new Form({
        id: "",
        name: "",
        email: "",
        bio: "",
        type: "",
        photo: "",
        password: "",
      }),
    };
  },
  methods: {
    updateProfile() {
      this.$Progress.start();
      this.form
        .put("api/profile")
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Profile updated successfully",
          });
          Fire.$emit("AfterUpdate");
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
        });
    },
    updatePhoto(e) {
      /* console.log(e); */
      let file = e.target.files[0];
      let reader = new FileReader();

      if (file["size"] < 2111775) {
        reader.onloadend = (file) => {
          /* console.log("RESULT", reader.result); */
          console.log(file);
          this.form.photo = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        Swal.fire("Opps!!!", "You are uploading larage file", "error");
      }
    },
  },
  created() {
    axios.get("api/profile").then(({ data }) => {
      this.userPhoto = "img/profile/" + data.photo;
      Fire.$on("AfterUpdate", () => {
        axios.get("api/profile").then((data) => {
          let photo = data.data.photo;
          this.userPhoto = "img/profile/" + photo;
        });
      });
      this.form.reset();
      this.form.fill(data);
      this.$Progress.finish();
    });
  },
  mounted() {
    console.log("Component mounted.");
  },
};
</script>
