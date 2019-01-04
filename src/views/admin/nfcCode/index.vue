<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-button v-if="atc_nfc_code_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" size="small" icon="edit">添加
            </el-button>
            <el-button v-if="nfc_code_batch_add" class="filter-item" style="margin-left: 10px;" @click="batchCreate" type="primary" size="small" icon="edit">批量添加
            </el-button>
            <!--<el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>-->
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                  highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号">
                <template scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="加密编码">
                <template scope="scope">
                    <span>{{ scope.row.encryptedCoding }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="版本号">
                <template scope="scope">
                    <span>{{ scope.row.versionNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="超链">
                <template scope="scope">
                    <span>{{ scope.row.superChain }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="编码状态">
                <template scope="scope">
                    <span>{{ scope.row.codeStatus | statusFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="140">
                <template scope="scope">
                    <span>{{ scope.row.creationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建人">
                <template scope="scope">
                    <span>{{ scope.row.creater }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="修改时间" width="140">
                <template scope="scope">
                    <span>{{ scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="修改人">
                <template scope="scope">
                    <span>{{ scope.row.modifier }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作"  width="160">
                <template scope="scope">
                    <el-button v-if="atc_nfc_code_upd" size="mini" type="success"
                               @click="handleUpdate(scope.row)">编辑
                    </el-button>
                    <el-button v-if="atc_nfc_code_del" size="mini" type="danger"
                               @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <el-form-item label="序号" prop="id" v-if="dialogStatus == 'update'">
                      <el-input v-model="form.id" placeholder="序号" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="加密编码" prop="encryptedCoding">
                        <el-input v-model="form.encryptedCoding" placeholder="请输入加密编码"></el-input>
                    </el-form-item>
                    <el-form-item label="版本号" prop="versionNumber">
                        <el-input v-model="form.versionNumber" placeholder="请输入版本号"></el-input>
                    </el-form-item>
                    <el-form-item label="超链" prop="superChain">
                        <el-input v-model="form.superChain" placeholder="请输入超链"></el-input>
                    </el-form-item>
                    <el-form-item label="编码状态" prop="codeStatus">
                        <!--<el-input v-model="form.codeStatus" placeholder="请输入编码状态"></el-input>-->
                      <el-select class="filter-item" v-model="form.codeStatus" placeholder="请选择编码状态">
                        <el-option v-for="item in statusOptions" :key="item" :label="item | statusFilter" :value="item"> </el-option>
                      </el-select>
                    </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
                <el-button v-else type="primary" @click="update('form')">修 改</el-button>
            </div>
        </el-dialog>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="加密编码" prop="encryptedCoding">
            <el-input v-model="form.encryptedCoding" placeholder="请输入加密编码"></el-input>
          </el-form-item>
          <el-form-item label="版本号" prop="versionNumber">
            <el-input v-model="form.versionNumber" placeholder="请输入版本号"></el-input>
          </el-form-item>
          <el-form-item label="超链" prop="superChain">
            <el-input v-model="form.superChain" placeholder="请输入超链"></el-input>
          </el-form-item>
          <el-form-item label="编码状态" prop="codeStatus">
            <!--<el-input v-model="form.codeStatus" placeholder="请输入编码状态"></el-input>-->
            <el-select class="filter-item" v-model="form.codeStatus" placeholder="请选择编码状态">
              <el-option v-for="item in statusOptions" :key="item" :label="item | statusFilter" :value="item"> </el-option>
            </el-select>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('form')">取 消</el-button>
          <el-button type="primary" @click="create('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  /* eslint-disable indent */

    import { fetchList, addObj, putObj, delObj, batchAdd} from '@/api/nfcCode'
    import waves from '@/directive/waves/index.js' // 水波纹指令
    import { mapGetters } from 'vuex'

    export default {
        name: 'table_atc_nfc_code',
        directives: {
            waves
        },
        data() {
            return {
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20
                },
                rules: {
                  encryptedCoding: [
                    {
                      required: true,
                      message: '加密编码',
                      trigger: 'blur'
                    }
                  ]
                },
                form: {
                },
                statusOptions: ["0", "1", "2"],
                dialogFormVisible: false,
                dialogStatus: '',
                    atc_nfc_code_add: false,
                    atc_nfc_code_upd: false,
                    atc_nfc_code_del: false,
                    nfc_code_batch_add: false,
                textMap: {
                    update: '编辑',
                    create: '创建',
                    batchAdd: '批量生成'
                },
                tableKey: 0
            }
        },
        computed: {
            ...mapGetters([
                'permissions'
            ])
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    0: '已生成未绑定',
                    1: '已绑定未使用',
                    2: '已使用'
                }
                return statusMap[status]
            }
        },
        created() {
            this.getList()
            this.atc_nfc_code_add = this.permissions['atc_nfc_code_add']
            this.atc_nfc_code_upd = this.permissions['atc_nfc_code_upd']
            this.atc_nfc_code_del = this.permissions['atc_nfc_code_del']
            this.nfc_code_batch_add = this.permissions['nfc_code_batch_add']
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.list = response.data.records
                    this.total = response.data.total
                    this.listLoading = false
                })
            },
            handleFilter() {
              this.listQuery.page = 1
              this.getList()
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            handleDelete(row) {
              this.$confirm(
                "此操作将永久删除该编码, 是否继续?",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              ).then(() => {
                delObj(row.id)
                  .then(response => {
                    this.dialogFormVisible = false
                    this.getList()
                    this.$notify({
                      title: '成功',
                      message: '删除成功',
                      type: 'success',
                      duration: 2000
                    })
                  })
                  .cache(() => {
                    this.$notify({
                      title: "失败",
                      message: "删除失败",
                      type: "error",
                      duration: 2000
                    })
                  })
              })
            },
            handleCreate() {
                this.form = {}
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
            },
          batchCreate() {
            this.dialogStatus = 'batchAdd'
            this.dialogFormVisible11111 = true
          },
          handleUpdate(row) {
              this.dialogFormVisible = true
              this.dialogStatus = 'update'
              this.form.id = row.id
              this.form.encryptedCoding = row.encryptedCoding
              this.form.versionNumber = row.versionNumber
              this.form.superChain = row.superChain
              this.form.codeStatus = row.codeStatus
          },
            create(formName) {
                const set = this.$refs
                        set[formName].validate(valid => {
                    if (valid) {
                        addObj(this.form)
                                .then(() => {
                                    this.dialogFormVisible = false
                                    this.getList()
                                    this.$notify({
                                        title: '成功',
                                        message: '创建成功',
                                        type: 'success',
                                        duration: 2000
                                    })
                                })
                    } else {
                        return false
                    }
                })
            },
            cancel(formName) {
                this.dialogFormVisible = false
                const set = this.$refs
                set[formName].resetFields()
            },
            update(formName) {
                const set = this.$refs
                        set[formName].validate(valid => {
                    if (valid) {
                        this.dialogFormVisible = false
                        this.form.password = undefined
                        putObj(this.form).then(() => {
                            this.dialogFormVisible = false
                            this.getList()
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>
