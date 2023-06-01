# Built-in imports
from logging import getLogger

# Third-party imports
import pyodbc
from azure.identity import DefaultAzureCredential

# Rule-based imports
from scripts.utils import Singleton

logger = getLogger(__name__)


class ConnectDB(metaclass=Singleton):
    def __init__(self):
        self.credential = DefaultAzureCredential()

    def connection(self):
        try:
            conn = pyodbc.connect(
                '{"ConnectionString":"Driver={ODBC Driver 18 for SQL Server};Server=tcp:pharma-connect-db-server1.database.windows.net,1433;Database=pharma-connect-db1;Uid=TechRx;Pwd={your_password_here};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"}',
                auth=self.credential,
            )
            cursor = conn.cursor()
        except Exception as error:
            cursor = None
            logger.exception(error)
        return cursor
