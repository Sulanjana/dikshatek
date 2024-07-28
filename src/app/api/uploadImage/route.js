import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `public/uploads/${file.name}`;
    await writeFile(path, buffer);

    return NextResponse.json({ message: "Gambar Berhasil Diunggah!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Upload Gambar Gagal!" },
      { status: 500 }
    );
  }
}
