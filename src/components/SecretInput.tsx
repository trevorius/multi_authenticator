'use client'

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import jsQR from 'jsqr';

export default function SecretInput() {
	const [secret, setSecret] = useState('');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setImageFile] = useState<File | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setImageFile(file);
		if (file) {
			const reader = new FileReader();
			reader.onload = async () => {
				if (reader.result) {
					processImage(reader.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
		const items = Array.from(e.clipboardData.items);
		for (const item of items) {
			if (item.type.startsWith('image/')) {
				const file = item.getAsFile();
				if (file) {
					const reader = new FileReader();
					reader.onload = async () => {
						if (reader.result) {
							processImage(reader.result as string);
						}
					};
					reader.readAsDataURL(file);
				}
			}
		}
	};

	const processImage = (imageSrc: string) => {
		const img = new Image();
		img.src = imageSrc;
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				ctx.drawImage(img, 0, 0, img.width, img.height);
				const imageData = ctx.getImageData(0, 0, img.width, img.height);
				const code = jsQR(imageData.data, imageData.width, imageData.height);
				if (code) {
					const Url = new URL(code.data);
					const secret = Url.searchParams.get('secret');
					setSecret(secret || '');
				} else {
					console.error('No QR code found.');
				}
			}
		};
	};

	return (
		<div className="space-y-2">
			<Label htmlFor="secret">
				Secret&nbsp;
				<small>
					( will accept pasted screenshot of a QR code )
				</small>
			</Label>
			<textarea
				id="secret"
				name="secretCode"
				value={secret || ''}
				onChange={(e) => setSecret(e.target.value)}
				onPaste={handlePaste}
				className="w-full p-2 border rounded-md"
				rows={4}
			/>
			<Label htmlFor="qr-file">Upload QR Code Image</Label>
			<Input
				type="file"
				id="qr-file"
				name="qr-file"
				accept="image/*"
				onChange={handleFileChange}
			/>
		</div>
	);
}