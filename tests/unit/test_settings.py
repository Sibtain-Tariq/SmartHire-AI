import os
import unittest
from unittest.mock import patch

from app.config.settings import Settings


class SettingsTests(unittest.TestCase):
    def test_empty_allowed_origins_defaults_to_localhost(self):
        with patch.dict(os.environ, {"ALLOWED_ORIGINS": ""}, clear=False):
            settings = Settings(_env_file=None)
            self.assertEqual(settings.allowed_origins, ["http://localhost:5173"])

    def test_comma_separated_allowed_origins_are_split(self):
        with patch.dict(os.environ, {"ALLOWED_ORIGINS": "http://localhost:5173,http://127.0.0.1:5173"}, clear=False):
            settings = Settings(_env_file=None)
            self.assertEqual(settings.allowed_origins, ["http://localhost:5173", "http://127.0.0.1:5173"])


if __name__ == "__main__":
    unittest.main()
