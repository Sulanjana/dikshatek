import { NextResponse } from "next/server";
import pool from "../../lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM Product");

    return NextResponse.json(
      { message: "Data Product Berhasil di Ambil!", data: rows },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Data Product Gagal di Ambil!" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { plu, name, product_category_id, active, created_user } =
      await req.json();

    const [result] = await pool.query(
      "INSERT INTO Product (plu, name, product_category_id, active, created_user) VALUES (?, ?, ?, ?, ?)",
      [plu, name, product_category_id, active, created_user]
    );

    return NextResponse.json(
      {
        message: "Produk berhasil dibuat!",
        data: { id: result.insertId, name, active, created_user },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal membuat produk!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const { id, plu, name, product_category_id, active, updated_user } =
      await req.json();

    const [result] = await pool.query(
      "UPDATE Product SET plu = ?, name = ?, product_category_id = ?, active = ?, updated_user = ? WHERE id = ?",
      [plu, name, product_category_id, active, updated_user, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Produk berhasil diperbarui!",
        data: { id, name, active, updated_user },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal memperbarui produk!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const [result] = await pool.query("DELETE FROM Product WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Produk berhasil dihapus!" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal menghapus produk!" },
      { status: 500 }
    );
  }
}
