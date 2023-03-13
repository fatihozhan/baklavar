import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Lütfen Adınızı Giriniz.",
    },
    username: {
      type: String,
      required: "Lütfen Kullanıcı Adınızı Giriniz.",
    },
    email: {
      type: String,
      required: "Lütfen Emailinizi Giriniz.",
    },
    images:       {
      type: Array,
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AfgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwECB//EADEQAAICAQIEBAQEBwAAAAAAAAABAgMEBRESITFBIlFhcRMygbFCUpHRFDNDYqHB8P/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cQAAAAAAAAAAAAAAAAAAAAAAAAAAOGVl040d7Zc30iurOeoZkcSrdbOyXyozttkrbHOx7yfVgWF+sXSe1MVBeb5siyz8qXW+f05EcASoajlwe6ub9Gkybjazu1HIht/dH9ioAGtrshZBTrkpRfRo+jMYeXZiWcUecG/FHzNJTbC6qNlb3jJcgPsAAAAAAAAPpzBG1GbrwrpLrw7fryAoM3IeTkys38PSPscAAAAAAAAWmh5Dja6JPwy5x9/++xVnTFm6smqa7SQGrAAAAAAAAIerrfT7dvT7kw55FfxaLK/zRaAygDTTaktmuqAAAAAAAPYLecUu7SPCVptTtza12i+J+yA0oAAAAAAAAAAotZxPh2/HgvBP5vRlaa2cI2RcZpOLWzT7lFnaZZS3OlOdfkubQFeAAAB7CMpyUYRcpPokgPC/wBIxHj1fEmtrJ9vJHLTtM4GrchJyXSHZe5agAAAAAAAADlffVRDjtmor7nLOzIYle75zfyx8zO3XWX2Odsm5P8AwBdV6vRO3gkpQh2myxTTSaaafdGRO+Nl3438qe0fyvmgNBfhY973sqjv5rkyK9Gx2+U7F9UcqtaX9al+8Gd46vivq5r3iB5DR8aL8Tsl6ORMpoqoW1VcY+yIc9Yxorw/El7RIt2s2STVNah6y5gW911dEOO2SjH1IdGrY9k+GSlXz5OXR/sUdt1l0+O2blL17HwQa5NNbroemdwNQniyUZ7yq7ruvY0EJRnFSi94vmmij6AAA532wpqlZN7RitzoUuuZG8448XyXil/oCuyL55F0rLOr6LyRzAAAAAAAAAAAAAWWj5jqsVE34Jvw79mVoXLmuoGvBGwMj+JxoTfzdJe5JA8b2W/kZXItd107H+KW/wBDR58nDCukuvCzMbAANhsAA2GwADYbAANhsAA2GwADYbAWmg28N1lL/Et19C7Mzp0nDOpfnLb9TTAf/9k=",
    },
    password: {
      type: String,
      required: "Şifrenizi Giriniz.",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
