import { NextResponse } from "next/server";
import pool from "../../lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM ProductCategory"); // Ganti dengan query yang sesuai

    return NextResponse.json(
      { message: "Data Product Category Berhasil di Ambil!", data: rows },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Data Product Category Gagal di Ambil!" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, active, created_user } = await req.json();

    const [result] = await pool.query(
      "INSERT INTO ProductCategory (name, active, created_user) VALUES (?, ?, ?)",
      [name, active, created_user]
    );

    return NextResponse.json(
      {
        message: "Kategori Produk berhasil dibuat!",
        data: { id: result.insertId, name, active, created_user },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal membuat kategori produk!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const { id, name, active, updated_user } = await req.json();

    const [result] = await pool.query(
      "UPDATE ProductCategory SET name = ?, active = ?, updated_user = ? WHERE id = ?",
      [name, active, updated_user, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Kategori Produk tidak ditemukan!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Kategori Produk berhasil diperbarui!",
        data: { id, name, active, updated_user },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal memperbarui kategori produk!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const [result] = await pool.query(
      "DELETE FROM ProductCategory WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Kategori Produk tidak ditemukan!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Kategori Produk berhasil dihapus!" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal menghapus kategori produk!" },
      { status: 500 }
    );
  }
}
