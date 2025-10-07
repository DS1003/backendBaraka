// Entité User (métier, sans dépendance technique)
class User {
  constructor({
    id,
    email,
    password = null,
    provider = 'local',
    name,
    profileImage = null,
    phone = null,
    role = 'USER',
    isActive = true,
    lastLogin = null,
    resetToken = null,
    wooConfig = null,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.provider = provider;
    this.name = name;
    this.profileImage = profileImage;
    this.phone = phone;
    this.role = role;
    this.isActive = isActive;
    this.lastLogin = lastLogin;
    this.resetToken = resetToken;
    this.wooConfig = wooConfig;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default User;
