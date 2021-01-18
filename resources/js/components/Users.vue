<template>
  <div class="container">
    <div class="row pt-5"  v-if="$gate.isAdmin()">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users Table</h3>
            <div class="card-tools">
              <button class="btn btn-success" @click="newModal">
                AddNew <i class="fa fa-user-plus fa-fw"></i>
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Created At</th>

                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users.data" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span class="tag tag-success">{{
                      user.type | capitalize
                    }}</span>
                  </td>
                  <td>
                    <span class="tag tag-success">{{
                      user.created_at | customDate
                    }}</span>
                  </td>
                  <td>
                    <a href="#" @click="editModal(user)">
                      <i class="fa fa-edit"></i>
                    </a>
                    |
                    <a href="#" @click="deleteUser(user.id)">
                      <i class="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
            <div class="card-footer">
                <pagination :data="users" @pagination-change-page="getResults">
                    <span slot="prev-nav">&lt; Previous</span>
                    <span slot="next-nav">Next &gt;</span>
                </pagination>
<!--                <pagination :data="users" @pagination-change-page="getResults"></pagination>-->
            </div>
        </div>
        <!-- /.card -->
      </div>
    </div>


      <div v-if="!$gate.isAdmin()">
          <NotFound/>
      </div>



    <!-- Button trigger modal -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="addNew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addNew"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-show="!editMode" id="addNewLongTitle">
              Add New
            </h5>
            <h5 class="modal-title" v-show="editMode" id="addNewLongTitle">
              Update user's info
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editMode ? updateUser() : createUser()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder="Name"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                />
                <has-error :form="form" field="name"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.email"
                  type="text"
                  name="email"
                  class="form-control"
                  placeholder="someone@email.com"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                />
                <has-error :form="form" field="email"></has-error>
              </div>

              <div class="form-group">
                <textarea
                  v-model="form.bio"
                  type="text"
                  name="bio"
                  class="form-control"
                  placeholder="Short bio(optional)"
                  :class="{ 'is-invalid': form.errors.has('bio') }"
                />
                <has-error :form="form" field="bio"></has-error>
              </div>
              <div class="form-group">
                <select
                  name="type"
                  id="type"
                  v-model="form.type"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                >
                  <option value="">Select user role</option>
                  <option value="admin">Admin</option>
                  <option value="user">Standard User</option>
                  <option value="author">Author</option>
                </select>

                <has-error :form="form" field="type"></has-error>
              </div>

              <div class="form-group">
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                />
                <has-error :form="form" field="password"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
              <button type="submit" v-show="!editMode" class="btn btn-primary">
                Create
              </button>
              <button type="submit" v-show="editMode" class="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import NotFound from "./NotFound";
export default {
    components: {NotFound},
    data() {
    return {
      editMode: true,
      users: {},
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
      getResults(page = 1) {
          axios.get('api/user?page=' + page)
              .then(response => {
                  this.users = response.data;
              });
      }
      ,
      updateUser() {
      /* console.log("Editing data"); */
      this.$Progress.start();

      // Send the ajax request via v-form
      this.form
        .put("api/user/" + this.form.id)
        .then(() => {
          $("#addNew").modal("hide");
          Fire.$emit("AfterCreate");
          Swal.fire("Updated!", "Your file has been updated.", "success");

          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
          Swal.fire("Warning!", "Something Wrong.Opps!!!", "warning");
        });
    },
    newModal() {
      this.editMode = false;
      this.form.reset();
      $("#addNew").modal("show");
    },
    editModal(user) {
      this.editMode = true;
      this.form.fill(user);
      $("#addNew").modal("show");
    },
    loadUsers() {
        if (this.$gate.isAdmin()){
           axios.get("api/user").then(({ data }) => (this.users = data));

        }
    },
    createUser() {
      this.$Progress.start();

      this.form
        .post("api/user")
        .then(() => {
          /* Custom event declaring */
          Fire.$emit("AfterCreate");

          $("#addNew").modal("hide");

          Toast.fire({
            icon: "success",
            title: "User Created successfully",
          });
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
          Swal.fire("Warning!", "Something Wrong.Opps!!!", "warning");
        });
    },
    deleteUser(id) {
      this.$Progress.start();
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.form
            .delete("api/user/" + id)
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              Fire.$emit("AfterCreate");
              this.$Progress.finish();
            })
            .catch(() => {
              this.$Progress.fail();
              Swal.fire("Warning!", "Something Wrong.Opps!!!", "warning");
            });
        }
      });
    },
  },
  created() {
    this.loadUsers();
    /* When a new user created it gonna load it instantly */
    Fire.$on("AfterCreate", () => {
      this.loadUsers();
    });
    // window.setInterval(() => this.loadUsers(), 3000);
  },
};
</script>
