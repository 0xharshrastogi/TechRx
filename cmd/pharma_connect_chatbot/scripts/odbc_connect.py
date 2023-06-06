# Built-in imports
import json
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
            print('in connection')
            # with open(r'.\TechRx\cmd\TechRxProject\TechRxApp\database_connection\creds.json') as file:
            #     json_content = file.read()
            #     conn_str = (json.loads(json_content))['ConnectionString']
            conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};Server=tcp:pharma-connect-db-server1.database.windows.net,1433;Database=pharma-connect-db1;Uid=TechRx;Pwd=Cognizant@7;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;", auth=self.credential)
            cursor = conn.cursor()
        except Exception as error:
            cursor = None
            logger.exception(error)
        return cursor