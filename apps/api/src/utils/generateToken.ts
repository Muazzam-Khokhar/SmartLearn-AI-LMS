import Jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
  return Jwt.sign({
    id: user._id,
    email: user.email,
    role: user.role
  },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

