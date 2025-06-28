import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Error from "./error";
import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { UrlState } from "@/context";
import { QRCode } from "react-qrcode-logo";

export function CreateLink({ onSuccess }) {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink || "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup.string().url("Must be a valid URL").required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (!error && data) {
      if (onSuccess) onSuccess();
      navigate(`/link/${data[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const createNewLink = async () => {
    setErrors({});
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (err) {
      const newErrors = {};
      err?.inner?.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={!!longLink}
      onOpenChange={(open) => {
        if (!open) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" className="font-semibold">
          Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-[#0f172a] text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create New</DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Fill out the form to generate a shortened URL and QR code.
          </DialogDescription>
        </DialogHeader>

        {formValues.longUrl && (
          <div className="flex justify-center mb-4">
            <QRCode
              ref={ref}
              size={180}
              value={formValues.longUrl}
              bgColor="#0f172a"
              fgColor="#ffffff"
              logoImage="/logo.png"
              qrStyle="dots"
              eyeRadius={8}
            />
          </div>
        )}

        <div className="space-y-3">
          <Input
            id="title"
            placeholder="Short Link Title"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <Error message={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Paste your long URL here..."
            value={formValues.longUrl}
            onChange={handleChange}
          />
          {errors.longUrl && <Error message={errors.longUrl} />}

          <div className="flex items-center gap-2">
            <Card className="bg-gray-800 px-3 py-2 text-white border border-gray-600">
              ZapLink.in/
            </Card>
            <Input
              id="customUrl"
              placeholder="Custom slug (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <Error message={error.message} />}

        <DialogFooter className="mt-4 sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            onClick={createNewLink}
          >
            {loading ? <BeatLoader size={10} color="#fff" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
