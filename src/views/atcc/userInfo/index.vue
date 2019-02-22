<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="电话号码" v-model="listQuery.tel" size="small" >
            </el-input>
            <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="邮箱" v-model="listQuery.email" size="small" >
            </el-input>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索</el-button>
            <br/>
            <el-button v-if="atc_user_info_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加
            </el-button>
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                  highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号">
                <template scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="电话">
                <template scope="scope">
                    <span>{{ scope.row.tel }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="密码">
                <template scope="scope">
                    <span>{{ scope.row.pwd }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="编号">
                <template scope="scope">
                    <span>{{ scope.row.num }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column align="center" label="该用户累计充值金额">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.rmbMoney }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" label="该用户token币余额">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.tokenMoney }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="邮箱">
                <template scope="scope">
                    <span>{{ scope.row.email }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column align="center" label="头像">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.pic }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" label="状态：认证 0未认证 1个人认证 2机构认证">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.status }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="创建时间">
                <template scope="scope">
                    <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column align="center" label="">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.updateTime }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" label="微信小程序openid">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.openid }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" label="微信登录unionid">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.unionid }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" label="用户token">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.token }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" label="公钥 ">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.publicKey }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" label="私钥">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.privateKey }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="驳回原因">
                <template scope="scope">
                    <span>{{ scope.row.dismissal }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column align="center" label="以太坊版本 默认1">-->
                <!--<template scope="scope">-->
                    <!--<span>{{ scope.row.etherenumBan }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column label="操作">-->
                <!--<template scope="scope">-->
                    <!--<el-button v-if="atc_user_info_upd" size="small" type="success"-->
                               <!--@click="handleUpdate(scope.row)">编辑-->
                    <!--</el-button>-->
                    <!--<el-button v-if="atc_user_info_del" size="mini" type="danger"-->
                               <!--@click="handleDelete(scope.row)">删除-->
                    <!--</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
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
                    <el-form-item label="" prop="username">
                        <el-input v-model="form.id" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="username">
                        <el-input v-model="form.tel" placeholder="电话"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="username">
                        <el-input v-model="form.pwd" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="编号" prop="username">
                        <el-input v-model="form.num" placeholder="编号"></el-input>
                    </el-form-item>
                    <el-form-item label="该用户累计充值金额" prop="username">
                        <el-input v-model="form.rmbMoney" placeholder="该用户累计充值金额"></el-input>
                    </el-form-item>
                    <el-form-item label="该用户token币余额" prop="username">
                        <el-input v-model="form.tokenMoney" placeholder="该用户token币余额"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="username">
                        <el-input v-model="form.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="头像" prop="username">
                        <el-input v-model="form.pic" placeholder="头像"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：认证 0未认证 1个人认证 2机构认证" prop="username">
                        <el-input v-model="form.status" placeholder="状态：认证 0未认证 1个人认证 2机构认证"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="username">
                        <el-input v-model="form.createTime" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="username">
                        <el-input v-model="form.updateTime" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信小程序openid" prop="username">
                        <el-input v-model="form.openid" placeholder="微信小程序openid"></el-input>
                    </el-form-item>
                    <el-form-item label="微信登录unionid" prop="username">
                        <el-input v-model="form.unionid" placeholder="微信登录unionid"></el-input>
                    </el-form-item>
                    <el-form-item label="用户token" prop="username">
                        <el-input v-model="form.token" placeholder="用户token"></el-input>
                    </el-form-item>
                    <el-form-item label="公钥 " prop="username">
                        <el-input v-model="form.publicKey" placeholder="公钥 "></el-input>
                    </el-form-item>
                    <el-form-item label="私钥" prop="username">
                        <el-input v-model="form.privateKey" placeholder="私钥"></el-input>
                    </el-form-item>
                    <el-form-item label="驳回原因" prop="username">
                        <el-input v-model="form.dismissal" placeholder="驳回原因"></el-input>
                    </el-form-item>
                    <el-form-item label="以太坊版本 默认1" prop="username">
                        <el-input v-model="form.etherenumBan" placeholder="以太坊版本 默认1"></el-input>
                    </el-form-item>
                    <el-form-item label="删除标识" prop="username">
                        <el-input v-model="form.delFlag" placeholder="删除标识"></el-input>
                    </el-form-item>
                    <el-form-item label="备用字段" prop="username">
                        <el-input v-model="form.alternateField" placeholder="备用字段"></el-input>
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
                <el-button v-else type="primary" @click="update('form')">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchList, addObj, putObj, delObj } from '@/api/userInfo'
    import waves from '@/directive/waves/index.js' // 水波纹指令
    import { mapGetters } from 'vuex'

    export default {
        name: 'table_atc_user_info',
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
                },
                form: {
                },
                dialogFormVisible: false,
                dialogStatus: '',
                    atc_user_info_add: false,
                    atc_user_info_upd: false,
                    atc_user_info_del: false,
                textMap: {
                    update: '编辑',
                    create: '创建'
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
                    0: '有效',
                    1: '无效'
                }
                return statusMap[status]
            }
        },
        created() {
            this.getList()
            this.atc_user_info_add = this.permissions['atc_user_info_add']
            this.atc_user_info_upd = this.permissions['atc_user_info_upd']
            this.atc_user_info_del = this.permissions['atc_user_info_del']
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
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            handleFilter() {
              this.listQuery.page = 1
              this.getList()
            },
            handleDelete(row) {
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
            },
            handleCreate() {
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
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
            },
        }
    }
</script>
