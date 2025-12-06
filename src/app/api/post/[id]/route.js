import { NextResponse } from "next/server";
import { getPool } from "@/lib/mssql";

const data = [
    {
      id: 10,
      src: "/images/AnhTinTuc/2025/9/PCCC1.jpg",
      caption:
        "TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026",
      fulltext: "fulltext",
      description: `Ngày 22/09/2025, tại Trường Tiểu học Lý Tự Trọng đã diễn ra buổi tập huấn phòng cháy chữa cháy và cứu nạn cứu hộ năm học 2025-2026.
Mở đầu chương trình, các em học sinh đã có dịp giao lưu, trò chuyện cùng Thiếu tá Trần Phước Hùng – Phó đội trưởng Đội PCCC & CNCH khu vực 1. Đồng chí đã chia sẻ những kiến thức và kỹ năng quan trọng về cách nhận biết nguy cơ cháy nổ, các biện pháp phòng tránh cũng như những bước cần làm để đảm bảo an toàn khi sự cố xảy ra.
Sau phần chia sẻ, là các em học sinh và quý thầy cô bước vào phần diễn tập thực tế. Khi hồi chuông báo cháy vang lên, toàn bộ học sinh đã nhanh chóng xếp hàng, di chuyển trật tự theo sự hướng dẫn của các thầy cô giáo xuống khu vực tập kết an toàn. Sự nghiêm túc, kỷ luật của các em cho thấy tinh thần cảnh giác và ý thức trách nhiệm cao trong việc bảo vệ bản thân.
Ngay sau đó, lực lượng PCCC đã triển khai phương án dập lửa: xe cứu hỏa hú còi tiến thẳng vào sân trường, các chiến sĩ nhanh chóng thao tác, kéo vòi rồng phun nước để “dập tắt đám cháy giả định”. Đồng thời, tình huống cứu nạn cứu hộ cũng được mô phỏng, giúp học sinh tận mắt chứng kiến cách lực lượng chức năng phối hợp khẩn trương, chính xác để bảo đảm an toàn cho mọi người.
Buổi tập huấn đã để lại nhiều ấn tượng sâu sắc, giúp học sinh không chỉ được trang bị kiến thức mà còn rèn luyện kỹ năng thực tế, tạo sự tự tin, bình tĩnh khi đối mặt với những tình huống nguy hiểm.
Một ngày học bổ ích, thiết thực và đầy trải nghiệm!`,
      categoryId: 1,
      userId: 1,
      status: 3,
      createDate: "01-01-2025",
      updateDate: "01-01-2025",
      featured: true,
    },
    {
      id: 11,
      src: "/images/AnhTinTuc/2025/9/KG-1.jpg",
      caption:
        "TRƯỜNG TIỂU HỌC LÝ TỰ TRỌNG HÂN HOAN CHÀO ĐÓN NĂM HỌC MỚI 2025-2026",
      fulltext: "fulltext",
      description: `Hưởng ứng ngày toàn dân đưa trẻ đến trường, trong không khí rộn ràng đón chào năm học mới trên mọi miền Tổ quốc, sáng ngày 05/9/2024, Trường Tiểu học Lý Tự Trọng long trọng tổ chức lễ khai giảng năm học 2025 - 2026. Tiếng trống khai trường đã điểm, các thầy giáo, cô giáo và học sinh bước vào năm học mới với niềm tin, kỳ vọng sẽ gặt hái được nhiều thành công mới.
Tại buổi lễ, nhà trường vinh dự đón tiếp đồng chí Phan Hữu Phụng, Đảng ủy viên - Phó Chủ tịch Thường trực UBND phường Hải Châu, Ban đại diện hội Cha mẹ học sinh nhà trường và các lớp về dự Lễ Khai giảng cùng nhà trường.
Chương trình Lễ khai giảng diễn ra trong điều kiện thời tiết mát mẻ, thuận lợi trong không khí vui tươi, sôi nổi, phấn khởi. Phần đón học sinh lớp một vào trường được tổ chức chu đáo trong niềm vui hân hoan của 256 học sinh  lớp 1 mới vào trường.
Sau phần nghi lễ ngắn gọn trên sân trường, các thầy cô về hội trường, học sinh vào lớp học để tiếp tục xem chương trình trực tuyến Lễ Khai giảng và kỉ niệm 80 năm  truyền thống ngành Giáo dục.
Chương trình kết thúc, học sinh còn được xem phần múa lân vui nhộn chào năm học mới.`,
      categoryId: 1,
      userId: 1,
      status: "published",
      createDate: "01-02-2025",
      updateDate: "01-01-2025",
      featured: true,
    },

    {
      id: 12,
      src: "/images/AnhTinTuc/2025/9/HS1.jpg",
      caption:
        "Trường Tiểu học Lý Tự Trọng chào đón các bạn nhỏ Lớp 1 năm học 2025-2026",
      fulltext: "fulltext",
      description: `Sáng nay, ngày 29 tháng 8 năm 2025, trong không khí rộn ràng và tươi vui của những ngày đầu thu, trường Tiểu học Lý Tự Trọng hân hoan tổ chức chương trình "Chào đón học sinh lớp 1", đánh dấu một khởi đầu mới đầy ý nghĩa cho các em học sinh lần đầu tiên đến trường.
Từ 7 giờ sáng, không khí tại cổng trường đã trở nên náo nhiệt hơn bao giờ hết. Nhiều phụ huynh dắt tay những cô bé, cậu bé trong bộ đồng phục mới tinh, gương mặt vừa háo hức vừa có chút bỡ ngỡ, tiến vào sân trường.
Đáp lại sự mong chờ đó là một chương trình chào đón được chuẩn bị vô cùng chu đáo và ấm áp. Ngay từ cổng trường, các em học sinh lớp 1 đã được các thầy cô giáo và các anh chị đội viên khối trên chào đón nồng nhiệt. Những tấm sticker xinh xắn được các anh chị cẩn thận gắn lên áo cho từng em như một lời chào mừng thân thiện, giúp các "tân binh" cảm thấy tự tin và gần gũi hơn.
Không khí nhanh chóng trở nên sôi động với màn giao lưu đặc sắc cùng chú hề vui nhộn. Tiếng cười giòn tan, những trò chơi tương tác thú vị đã nhanh chóng xua đi mọi sự rụt rè ban đầu, giúp các em làm quen với bạn bè và thầy cô một cách tự nhiên nhất.
Đặc biệt, trong buổi sinh hoạt, cô Hiệu trưởng nhà trường cùng các cô giáo chủ nhiệm đã tận tay trao tặng những món quà nhỏ xinh xắn cho từng em học sinh. Món quà mang giá trị vật chất không nhiều nhưng chứa đựng tình yêu thương và lời động viên, chúc các em có một năm học đầu tiên thật vui và bổ ích dưới mái trường Lý Tự Trọng.
Bạn Nguyễn Quỳnh My, một học sinh lớp 1, vui vẻ khoe món quà: "Con vui lắm ạ! Ở trường có chú hề, có các bạn, lại còn được cô giáo tặng quà nữa. Con rất thích đi học ạ!"
Ngày hội tựu trường đã khép lại thành công tốt đẹp, để lại trong lòng các em nhỏ và các bậc phụ huynh những ấn tượng khó phai. Đây chắc chắn sẽ là một kỷ niệm đẹp, là hành trang vững chắc để các em tự tin bước vào năm học 2025 - 2026 đầy hứng khởi.`,
      categoryId: 1,
      userId: 1,
      status: "published",
      createDate: "01-03-2025",
      updateDate: "01-01-2025",
      featured: true,
    },

    {
      id: 13,
      src: "/images/AnhTinTuc/2025/8/trai_he_25-2.jpg",
      caption: "TRẠI HÈ “ĐI TÌM NGUỒN CỘI” – NGÀY TRẢI NGHIỆM ĐÁNG NHỚ",
      fulltext: "fulltext",
      description: `Ngày 10/8/2025, Trường Tiểu học Lý Tự Trọng phối hợp cùng Hệ thống Giáo dục Khai Minh Đức đã tổ chức trại hè với chủ đề “Đi tìm nguồn cội” dành cho học sinh khối 4–5.
Trong một ngày trải nghiệm, các em được tham gia nhiều hoạt động bổ ích như: Tìm hiểu lịch sử và nguồn gốc dân tộc Việt Nam, thực hiện 5 điều Bác Hồ dạy, trải nghiệm trò chơi dân gian, giao lưu cùng diễn giả về văn hóa ứng xử: văn hóa giờ ăn, văn hóa chào hỏi, lòng biết ơn.
Đặc biệt, hoạt động viết thư tri ân cha mẹ đã để lại nhiều cảm xúc sâu lắng. Những giọt nước mắt lăn dài, những cái ôm nồng ấm được gửi đến người thân yêu đã tạo nên khoảnh khắc khó quên trong lòng mỗi em.
Chương trình không chỉ mang lại niềm vui và tiếng cười, mà còn giúp các em thêm yêu quê hương, trân trọng công ơn cha mẹ, thầy cô. Đây chắc chắn sẽ là một dấu ấn đẹp của mùa hè năm nay.
Xin trân trọng cảm ơn hệ thống Giáo dục Khai Minh Đức đã hỗ trợ nhà trường về cả chương trình lẫn kinh phí tổ chức, cảm ơn quý phụ huynh đã tạo điều kiện thuận lợi cho các em tham gia hội trại, cảm ơn các thầy cô giáo và các anh chị tình nguyện viên đã chung tay góp sức mang lại thành công cho hội trại lần này.
Một số hình ảnh đẹp từ trại hè:`,
      categoryId: 1,
      userId: 1,
      status: "published",
      createDate: "01-04-2025",
      updateDate: "01-01-2025",
      featured: true,
    },

    {
      id: 14,
      src: "/images/AnhTinTuc/2025/8/PHK1-1.jpg",
      caption: `TRƯỜNG TIỂU HỌC LÝ TỰ TRỌNG: GẮN KẾT NHÀ TRƯỜNG VÀ GIA ĐÌNH QUA CHUYÊN ĐỀ "CHA MẸ ĐỒNG HÀNH CÙNG CON TRẺ"`,
      fulltext: "fulltext",
      description: `Vừa qua, trong không khí hân hoan chào đón năm học mới, Trường Tiểu học Lý Tự Trọng đã tổ chức thành công buổi gặp mặt phụ huynh học sinh khối lớp 1. Đây không chỉ là dịp để nhà trường và gia đình gặp gỡ, trao đổi thông tin mà còn là một buổi sinh hoạt chuyên đề ý nghĩa với chủ đề "Cha mẹ đồng hành cùng con trẻ", thu hút sự tham gia của đông đảo các bậc phụ huynh.
Buổi gặp mặt diễn ra trong không khí ấm cúng và cởi mở. Ban Giám hiệu nhà trường đã chia sẻ những thông tin tổng quan về chương trình học, các hoạt động của khối lớp 1, đồng thời nhấn mạnh tầm quan trọng của sự phối hợp chặt chẽ giữa gia đình và nhà trường trong giai đoạn đầu đời của các em học sinh. Đây là bước ngoặt quan trọng và sự đồng hành của cha mẹ chính là nền tảng vững chắc nhất giúp các con tự tin bước vào môi trường học tập mới.
Điểm nhấn đặc biệt của chương trình là chuyên đề "Cha mẹ đồng hành cùng con trẻ" được chia sẻ bởi diễn giả khách mời – Thầy giáo Tiến sĩ Phan Trung Phương, Cố vấn cấp cao của Hệ thống giáo dục Khai Minh Đức. Với kinh nghiệm nhiều năm trong lĩnh vực tâm lý và giáo dục trẻ em, TS. Phan Trung Phương đã mang đến những góc nhìn sâu sắc, những phương pháp giáo dục khoa học và thực tiễn.
Bài chia sẻ của thầy đã tập trung vào việc thấu hiểu tâm lý của trẻ ở lứa tuổi vào lớp 1, cách xây dựng thói quen tự lập, khơi gợi niềm yêu thích học tập và đặc biệt là nghệ thuật lắng nghe, động viên để trở thành người bạn lớn của con.
Sự tham gia nhiệt tình của đông đảo phụ huynh, lấp đầy hội trường đã cho thấy sự quan tâm sâu sắc của các gia đình đối với việc giáo dục con em mình. Nhiều phụ huynh chăm chú lắng nghe và bày tỏ sự tâm đắc với những kiến thức bổ ích nhận được.
Buổi gặp mặt phụ huynh đầu năm kết hợp chuyên đề giáo dục của Trường Tiểu học Lý Tự Trọng đã khép lại thành công tốt đẹp, để lại nhiều ấn tượng sâu sắc. Sự kiện này không chỉ là cầu nối vững chắc giữa gia đình và nhà trường mà còn trang bị thêm hành trang kiến thức cho các bậc cha mẹ, hứa hẹn một năm học mới hiệu quả và tràn đầy niềm vui cho các em học sinh khối lớp 1.`,
      categoryId: 2,
      userId: 1,
      status: "published",
      createDate: "02-04-2025",
      updateDate: "01-01-2025",
      featured: true,
    },

    {
      id: 15,
      src: "/images/AnhTinTuc/2025/5/bg1.jpg",
      caption: `TRƯỜNG TIỂU HỌC TỰ TRỌNG TỔ CHỨC LỄ BẾ GIẢNG VÀ PHÁT THƯỞNG NĂM HỌC 2024-2025`,
      fulltext: "fulltext",
      description: `Năm học 2024-2025 đã kết thúc. Đây là lúc gặt hái những thành quả từ sự nỗ lực trong giảng dạy, học tập và các hoạt động của tập thể giáo viên và học sinh nhà trường.
Tham dự buổi Lễ Bế giảng cùng thầy trò nhà trường có Ông Võ Thành Trung, Phó Bí thư Quận ủy hải Châu, các đại biểu đại diện lãnh đạo phòng GD-ĐT quận Hải Châu, đại diện Đảng ủy - UBND phường Thạch Thang, các đại biểu đại diện Hội Cha mẹ học sinh của Trường Tiểu học Lý Tự Trọng.
Trong diễn văn bế giảng năm học, cô Trần Thị Lệ hiệu trưởng nhà trường đã nêu bật được những nét nổi bật, những thành tích tiêu biểu của thầy và trò nhà trường trong năm học 2024-2025. Trong tất cả các em được hoàn thành chương trình lớp học và Hoàn thành CTTT, có 990 em được khen học sinh xuất sắc và Hoàn thành xuất sắc các nội dung học tập và rèn luyện, 160 em được bình chọn học sinh xuất sắc tiêu biểu của các lớp, 10 em được khen xuất sắc trong hoạt động Đội, 12 em được khen vượt khó học tập tốt.
Buổi lễ đã được tổ chức chu đáo và đã thành công tốt đẹp trong niềm vui rạng ngời xen niềm lưu luyến trên gương mặt các học trò sắp phải xa trường, xa bạn trong ba tháng hè sắp đến. Một năm học với nhiều thành công rực ỡ của trường Tiểu học Lý Tự Trọng đã khép lại.
Sau đây là những hình ảnh trong Lễ Bế giảng năm học 2024-2025 của trường.`,
      categoryId: 2,
      userId: 1,
      status: "published",
      createDate: "03-04-2025",
      updateDate: "01-01-2025",
      featured: true,
    },

    {
      id: 16,
      src: "/images/AnhTinTuc/2025/4/NS-1.jpg",
      caption: `HƯỞNG ỨNG NGÀY SÁCH VÀ VĂN HÓA ĐỌC VIỆT NAM 21/4`,
      fulltext: "fulltext",
      description: `Năm học 2024-2025 đã kết thúc. Đây là lúc gặt hái những thành quả từ sự nỗ lực trong giảng dạy, học tập và các hoạt động của tập thể giáo viên và học sinh nhà trường.
Tham dự buổi Lễ Bế giảng cùng thầy trò nhà trường có Ông Võ Thành Trung, Phó Bí thư Quận ủy hải Châu, các đại biểu đại diện lãnh đạo phòng GD-ĐT quận Hải Châu, đại diện Đảng ủy - UBND phường Thạch Thang, các đại biểu đại diện Hội Cha mẹ học sinh của Trường Tiểu học Lý Tự Trọng.
Trong diễn văn bế giảng năm học, cô Trần Thị Lệ hiệu trưởng nhà trường đã nêu bật được những nét nổi bật, những thành tích tiêu biểu của thầy và trò nhà trường trong năm học 2024-2025. Trong tất cả các em được hoàn thành chương trình lớp học và Hoàn thành CTTT, có 990 em được khen học sinh xuất sắc và Hoàn thành xuất sắc các nội dung học tập và rèn luyện, 160 em được bình chọn học sinh xuất sắc tiêu biểu của các lớp, 10 em được khen xuất sắc trong hoạt động Đội, 12 em được khen vượt khó học tập tốt.
Buổi lễ đã được tổ chức chu đáo và đã thành công tốt đẹp trong niềm vui rạng ngời xen niềm lưu luyến trên gương mặt các học trò sắp phải xa trường, xa bạn trong ba tháng hè sắp đến. Một năm học với nhiều thành công rực ỡ của trường Tiểu học Lý Tự Trọng đã khép lại.
Sau đây là những hình ảnh trong Lễ Bế giảng năm học 2024-2025 của trường.`,
      categoryId: 2,
      userId: 1,
      status: "published",
      createDate: "04-04-2025",
      updateDate: "01-01-2025",
      featured: true,
    },

    {
      id: 17,
      src: "/images/AnhTinTuc/2025/4/30-4-1.jpg",
      caption: `Kể chuyện lịch sử, tiếp lửa truyền thống cho học sinh tại Trường Tiểu học Lý Tự Trọng`,
      fulltext: "fulltext",
      description: `Năm học 2024-2025 đã kết thúc. Đây là lúc gặt hái những thành quả từ sự nỗ lực trong giảng dạy, học tập và các hoạt động của tập thể giáo viên và học sinh nhà trường.
Tham dự buổi Lễ Bế giảng cùng thầy trò nhà trường có Ông Võ Thành Trung, Phó Bí thư Quận ủy hải Châu, các đại biểu đại diện lãnh đạo phòng GD-ĐT quận Hải Châu, đại diện Đảng ủy - UBND phường Thạch Thang, các đại biểu đại diện Hội Cha mẹ học sinh của Trường Tiểu học Lý Tự Trọng.
Trong diễn văn bế giảng năm học, cô Trần Thị Lệ hiệu trưởng nhà trường đã nêu bật được những nét nổi bật, những thành tích tiêu biểu của thầy và trò nhà trường trong năm học 2024-2025. Trong tất cả các em được hoàn thành chương trình lớp học và Hoàn thành CTTT, có 990 em được khen học sinh xuất sắc và Hoàn thành xuất sắc các nội dung học tập và rèn luyện, 160 em được bình chọn học sinh xuất sắc tiêu biểu của các lớp, 10 em được khen xuất sắc trong hoạt động Đội, 12 em được khen vượt khó học tập tốt.
Buổi lễ đã được tổ chức chu đáo và đã thành công tốt đẹp trong niềm vui rạng ngời xen niềm lưu luyến trên gương mặt các học trò sắp phải xa trường, xa bạn trong ba tháng hè sắp đến. Một năm học với nhiều thành công rực ỡ của trường Tiểu học Lý Tự Trọng đã khép lại.
Sau đây là những hình ảnh trong Lễ Bế giảng năm học 2024-2025 của trường.`,
      categoryId: 2,
      userId: 1,
      status: "published",
      createDate: "05-04-2025",
      updateDate: "01-01-2025",
      featured: true,
    },

    {
      id: 18,
      src: "/images/AnhTinTuc/2025/3/VN2025-3.jpg",
      caption: `TRƯỜNG TIỂU HOC LÝ TỰ TRỌNG TỔ CHỨC HỘI DIỄN VĂN NGHỆ "TỰ HÀO THÀNH PHỐ QUÊ EM!”`,
      fulltext: "fulltext",
      description: `Năm học 2024-2025 đã kết thúc. Đây là lúc gặt hái những thành quả từ sự nỗ lực trong giảng dạy, học tập và các hoạt động của tập thể giáo viên và học sinh nhà trường.
Tham dự buổi Lễ Bế giảng cùng thầy trò nhà trường có Ông Võ Thành Trung, Phó Bí thư Quận ủy hải Châu, các đại biểu đại diện lãnh đạo phòng GD-ĐT quận Hải Châu, đại diện Đảng ủy - UBND phường Thạch Thang, các đại biểu đại diện Hội Cha mẹ học sinh của Trường Tiểu học Lý Tự Trọng.
Trong diễn văn bế giảng năm học, cô Trần Thị Lệ hiệu trưởng nhà trường đã nêu bật được những nét nổi bật, những thành tích tiêu biểu của thầy và trò nhà trường trong năm học 2024-2025. Trong tất cả các em được hoàn thành chương trình lớp học và Hoàn thành CTTT, có 990 em được khen học sinh xuất sắc và Hoàn thành xuất sắc các nội dung học tập và rèn luyện, 160 em được bình chọn học sinh xuất sắc tiêu biểu của các lớp, 10 em được khen xuất sắc trong hoạt động Đội, 12 em được khen vượt khó học tập tốt.
Buổi lễ đã được tổ chức chu đáo và đã thành công tốt đẹp trong niềm vui rạng ngời xen niềm lưu luyến trên gương mặt các học trò sắp phải xa trường, xa bạn trong ba tháng hè sắp đến. Một năm học với nhiều thành công rực ỡ của trường Tiểu học Lý Tự Trọng đã khép lại.
Sau đây là những hình ảnh trong Lễ Bế giảng năm học 2024-2025 của trường.`,
      categoryId: 2,
      userId: 1,
      status: "published",
      createDate: "06-04-2025",
      updateDate: "01-01-2025",
      featured: true,
    },

    {
      id: 19,
      src: "/images/AnhTinTuc/2025/3/CHUYEN_DE_TV_LOP_3.1.jpg",
      caption: `Chuyên đề dạy học TIẾNG VIỆT LỚP 3`,
      fulltext: "fulltext",
      description: `Năm học 2024-2025 đã kết thúc. Đây là lúc gặt hái những thành quả từ sự nỗ lực trong giảng dạy, học tập và các hoạt động của tập thể giáo viên và học sinh nhà trường.
Tham dự buổi Lễ Bế giảng cùng thầy trò nhà trường có Ông Võ Thành Trung, Phó Bí thư Quận ủy hải Châu, các đại biểu đại diện lãnh đạo phòng GD-ĐT quận Hải Châu, đại diện Đảng ủy - UBND phường Thạch Thang, các đại biểu đại diện Hội Cha mẹ học sinh của Trường Tiểu học Lý Tự Trọng.
Trong diễn văn bế giảng năm học, cô Trần Thị Lệ hiệu trưởng nhà trường đã nêu bật được những nét nổi bật, những thành tích tiêu biểu của thầy và trò nhà trường trong năm học 2024-2025. Trong tất cả các em được hoàn thành chương trình lớp học và Hoàn thành CTTT, có 990 em được khen học sinh xuất sắc và Hoàn thành xuất sắc các nội dung học tập và rèn luyện, 160 em được bình chọn học sinh xuất sắc tiêu biểu của các lớp, 10 em được khen xuất sắc trong hoạt động Đội, 12 em được khen vượt khó học tập tốt.
Buổi lễ đã được tổ chức chu đáo và đã thành công tốt đẹp trong niềm vui rạng ngời xen niềm lưu luyến trên gương mặt các học trò sắp phải xa trường, xa bạn trong ba tháng hè sắp đến. Một năm học với nhiều thành công rực ỡ của trường Tiểu học Lý Tự Trọng đã khép lại.
Sau đây là những hình ảnh trong Lễ Bế giảng năm học 2024-2025 của trường.`,
      categoryId: 2,
      userId: 1,
      status: "published",
      createDate: "07-04-2025",
      updateDate: "01-01-2025",
      featured: true,
    },
  ];

export async function GET(request, { params }) {
  const { id } = await params

  const item = data.find((n) => n.id === Number(id))
  console.log(id);
  

  if (!item) {
    return Response.json({ ok: false, message: "News not founds" }, { status: 404 })
  }

  return Response.json({ ok: true, data: item,})
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Thiếu ID bài viết!" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    // Kiểm tra xem bài viết có tồn tại không
    const check = await pool
      .request()
      .input("id", id)
      .query(`
        SELECT Id FROM Posts WHERE Id = @id
      `);

    if (check.recordset.length === 0) {
      return NextResponse.json(
        { message: "Bài viết không tồn tại" },
        { status: 404 }
      );
    }

    // Xóa bài viết
    await pool
      .request()
      .input("id", id)
      .query(`
        DELETE FROM Posts WHERE Id = @id
      `);

    return NextResponse.json({
      message: "Xóa bài viết thành công",
      deletedId: id,
    });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}