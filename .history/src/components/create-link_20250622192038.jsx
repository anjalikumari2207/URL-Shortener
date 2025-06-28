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
import { Card } from "./ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Error from "./error";
import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { UrlState } from "@/context";
import { QRCode } from "react-qrcode-logo";

export function CreateLink() {
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
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
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
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data, navigate]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" className="rounded-md">
          Create New Link
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-[#101624] text-white border border-gray-700 rounded-lg">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl sm:text-2xl">
            Create New
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-300">
            Fill out the form to generate your short link and QR.
          </DialogDescription>
        </DialogHeader>

        {formValues?.longUrl && (
          <QRCode
            ref={ref}
            size={250}
            value={formValues?.longUrl}
            fgColor="#ffffff"
            bgColor="#101624"
            ecLevel="H"
          />
        )}

        <div className="space-y-3 mt-4">
          <Input
            id="title"
            placeholder="Short Link's Title"
            value={formValues.title}
            onChange={handleChange}
            className="bg-[#0a0e1a] border border-gray-700 text-white placeholder-gray-400"
          />
          {errors.title && <Error message={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Enter your loooong URL"
            value={formValues.longUrl}
            onChange={handleChange}
            className="bg-[#0a0e1a] border border-gray-700 text-white placeholder-gray-400"
          />
          {errors.longUrl && <Error message={errors.longUrl} />}

          <div className="flex items-center gap-2">
            <Card className="bg-[#0a0e1a] text-white border border-gray-600 px-3 py-2 rounded-md text-sm">
              trimrr.in
            </Card>
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
              className="bg-[#0a0e1a] border border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          {error && <Error message={error.message} />}
        </div>

        <DialogFooter className="pt-4">
          <Button
            type="button"
            variant="destructive"
            className="w-full py-2 font-semibold rounded-md"
            onClick={createNewLink}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
