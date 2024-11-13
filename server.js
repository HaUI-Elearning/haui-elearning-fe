import jsonServer from 'json-server';
const server = jsonServer.create()
const router = jsonServer.router('db.json') // Kết nối tới file db.json của bạn
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Route tùy chỉnh để xử lý đăng nhập với POST
server.post('/login', (req, res) => {
  const { username, password } = req.body

  // Lấy danh sách người dùng từ db.json
  const users = router.db.get('users').value()

  // Tìm người dùng với thông tin đăng nhập khớp
  const user = users.find(user => user.username === username && user.password === password)

  if (user) {
    // Nếu thông tin đăng nhập đúng, trả về thông tin người dùng
    res.status(200).json({
      id: user.id,
      username: user.username,
      roleName: user.roleName,
      tokenContent: user.tokenContent,
      refreshToken: user.refreshToken,
      email: user.email,
      name: user.name,
      description: user.description,
    })
  } else {
    // Nếu không đúng, trả về lỗi
    res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' })
  }
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
