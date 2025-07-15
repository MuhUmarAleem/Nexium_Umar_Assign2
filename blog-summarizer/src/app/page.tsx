"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Globe,
  BookOpen,
  Sparkles,
  Link,
  CheckCircle,
} from "lucide-react";

export default function BlogSummarizer() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("urdu"); // "urdu" or "english"

  // 🔥 Clear summary when language or URL changes
  useEffect(() => {
    setSummary("");
  }, [lang, url]);

  const handleSubmit = async () => {
    setLoading(true);
    setSummary("");

    const res = await fetch("/api/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, lang }),
    });

    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  const exampleUrls = [
    "https://newbreak.church/meditation-is-the-key-to-a-flourishing-life/",
    "https://seths.blog/2025/07/the-poetry-machine/",
    "https://newbreak.church/womens-leadership-in-the-church-isnt-optional/",
    "https://newbreak.church/how-to-honor-god-and-government/",
  ];

  const rules = [
    "First select the language and then make search",
    "For both languages you have to make separate search",
    "Ensure the URL is valid and accessible",
    "Wait for the summary to complete before making another request",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 mb-6">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Blog Summarizer
            </h1>
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform lengthy blog posts into concise, insightful summaries with
            AI-powered analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Summarizer */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
              {/* Language Toggle */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-gray-100 rounded-full p-1 flex items-center gap-2">
                  <button
                    onClick={() => setLang("english")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                      lang === "english"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    English
                  </button>
                  <button
                    onClick={() => setLang("urdu")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                      lang === "urdu"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    اردو
                  </button>
                </div>
              </div>

              {/* URL Input */}
              <div className="relative mb-6">
                <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  placeholder="Enter blog URL to summarize..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 text-lg placeholder-gray-400 bg-white/80"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !url.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Summarize Blog
                  </>
                )}
              </button>

              {summary && (
                <div className="mt-8 animate-fadeIn">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-t-2xl">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <BookOpen className="w-6 h-6" />
                      Summary ({lang === "urdu" ? "اردو" : "English"})
                    </h2>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-b-2xl p-6">
                    <textarea
                      value={summary}
                      readOnly
                      className="w-full h-150 resize-none border-none focus:ring-0 text-gray-700 leading-relaxed text-lg"
                      style={{ outline: "none" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Link className="w-5 h-5 text-purple-600" />
                Example URLs
              </h3>
              <div className="space-y-3">
                {exampleUrls.map((exampleUrl, index) => (
                  <div
                    key={index}
                    onClick={() => setUrl(exampleUrl)}
                    className="group cursor-pointer p-3 bg-gray-50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="text-sm text-gray-600 group-hover:text-purple-700 break-all leading-relaxed">
                      {exampleUrl}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Usage Rules
              </h3>
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>

                    <div className="text-gray-700 leading-relaxed">{rule}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
