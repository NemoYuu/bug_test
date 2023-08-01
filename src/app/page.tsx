"use client";

import { Inter } from "next/font/google";
import styles from "./page.module.css";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
type MyValue = {
  id: number;
  name: string;
  value: number;
  group: string;
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [rows, setRows] = useState<MyValue[]>([]);
  const getData = async (page: number) => {
    const res = await fetch (`/api/data?page=${page}`, {
      method: 'GET', 
    })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const {data} = await res.json()
    setRows(data)

  }

  useEffect(() => {
    getData(0)
  }, [])
  

  return (
    <main className={styles.main}>
      <div>
        <div>
          {rows && (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableBody>
                  {rows.map((row: MyValue, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="text"
            onClick={() => {
              getData(0);
            }}
          >
            First
          </Button>
          <Button
            variant="text"
            onClick={() => {
              getData(1);
            }}
          >
            Second
          </Button>
        </div>
      </div>
    </main>
  );
}
