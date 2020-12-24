type RecordItem = {
  tags?: string[]
  notes: string
  type: string
  amount: number // 数据类型 object | string
  createdAt?: Date // 类 / 构造函数
}

type Tag = {
  id: string
  name: string
}
