import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../../api/axios";
import { ArrowLeftCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ScannerScreen = () => {
  const scannerRef = useRef(null);
  const hasScannedRef = useRef(false);
  const {id} = useParams();
  const Navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startScanner = async () => {
    try {
      setMessage("");
      setError("");
      hasScannedRef.current = false;

      // Create scanner instance
      const scanner = new Html5Qrcode("scanner-id");

      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },

        {
          fps: 10,
          qrbox: {
            width: 300,
            height: 300,
          },
        },

        // QR successfully detected
        async (decodedText) => {
          // Prevent multiple detections
          if (hasScannedRef.current) return;

          hasScannedRef.current = true;

          console.log("QR detected:", decodedText);

          // Stop camera
          try {
            await scanner.stop();
            setIsScanning(false);
          } catch (error) {
            console.log("Scanner stop error:", error);
          }
          setLoading(true);

          try {
            const response = await api.get(
              `/api/v1/user/scan/qr/${decodedText}/`,
            );
            console.log("Registered successfully");
            console.log(response.data.message);
            setMessage(response.data.message);
          } catch (error) {
            console.log("Scan request error:", error.response?.data?.message);

            setError(
              error.response?.data?.message ||
                "Something went wrong while scanning.",
            );
          } finally {
            setLoading(false);
          }
        },

        // QR not detected
        () => {},
      );

      setIsScanning(true);
    } catch (error) {
      console.log("Scanner start error:", error);

      setError("Unable to start camera. Please allow camera permission.");

      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current?.isScanning) {
      try {
        await scannerRef.current.stop();
        console.log("Scanner stopped");
      } catch (error) {
        console.log("Error stopping scanner:", error);
      }
    }

    setIsScanning(false);
  };

  const scanAgain = async () => {
    setMessage("");
    setError("");
    setLoading(false);

    await startScanner();
  };

  // Start scanner when component loads
  useEffect(() => {
    startScanner();

    // Stop camera when leaving page
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch((error) => {
          console.log("Cleanup scanner error:", error);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="absolute top-5 left-3">
        <ArrowLeftCircle className="cursor-pointer" onClick={()=> Navigate(-1)} size={30} />
      </div>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Scan QR Code</h1>

        <p className="text-gray-500 text-center mb-6">
          Scan the registration QR code to check in the user.
        </p>

        {/* Scanner */}
        <div id="scanner-id" className="w-full overflow-hidden rounded-xl" />

        {/* Loading */}
        {loading && (
          <div className="mt-5 text-center">
            <p className="text-gray-600">Checking registration...</p>
          </div>
        )}

        {/* Success */}
        {message && !loading && (
          <div className="mt-5 p-4 rounded-xl bg-green-100 border border-green-300 text-green-700">
            <p className="font-semibold">✅ {message}</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-5 p-4 rounded-xl bg-red-100 border border-red-300 text-red-700">
            <p className="font-semibold">❌ {error}</p>
          </div>
        )}

        {/* Scan Again */}
        {!isScanning && !loading && (
          <button
            onClick={scanAgain}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Scan Again
          </button>
        )}

        {/* Stop button */}
        {isScanning && (
          <button
            onClick={stopScanner}
            className="w-full mt-5 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition"
          >
            Stop Scanner
          </button>
        )}
      </div>
    </div>
  );
};

export default ScannerScreen;
