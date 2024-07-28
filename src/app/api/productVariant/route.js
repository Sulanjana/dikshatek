import { NextResponse } from "next/server";
import pool from "../../lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM ProductVariant");
    return NextResponse.json(
      { message: "Data varian produk berhasil diambil!", data: rows },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal mengambil data varian produk!" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const {
      product_id,
      code,
      name,
      image_location,
      qty,
      price,
      active,
      created_user,
    } = await req.json();

    const [result] = await pool.query(
      "INSERT INTO ProductVariant (product_id, code, name, image_location, qty, price, active, created_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [product_id, code, name, image_location, qty, price, active, created_user]
    );

    return NextResponse.json(
      {
        message: "Varian produk berhasil dibuat!",
        data: {
          id: result.insertId,
          product_id,
          code,
          name,
          image_location,
          qty,
          price,
          active,
          created_user,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal membuat varian produk!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const {
      id,
      product_id,
      code,
      name,
      image_location,
      qty,
      price,
      active,
      updated_user,
    } = await req.json();

    const [result] = await pool.query(
      "UPDATE ProductVariant SET product_id = ?, code = ?, name = ?, image_location = ?, qty = ?, price = ?, active = ?, updated_user = ? WHERE id = ?",
      [
        product_id,
        code,
        name,
        image_location,
        qty,
        price,
        active,
        updated_user,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Varian produk tidak ditemukan!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Varian produk berhasil diperbarui!",
        data: {
          id,
          product_id,
          code,
          name,
          image_location,
          qty,
          price,
          active,
          updated_user,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal memperbarui varian produk!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const [result] = await pool.query(
      "DELETE FROM ProductVariant WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Varian produk tidak ditemukan!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Varian produk berhasil dihapus!" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal menghapus varian produk!" },
      { status: 500 }
    );
  }
}
