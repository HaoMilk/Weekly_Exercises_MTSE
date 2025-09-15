export function homepage(req, res) {
  res.render("index", { message: "Xin chào, bạn đã truy cập API thành công!" });
}
