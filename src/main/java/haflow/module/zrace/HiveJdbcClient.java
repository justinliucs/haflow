package haflow.module.zrace;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

public class HiveJdbcClient {
	private static String driverName = "org.apache.hadoop.hive.jdbc.HiveDriver";

	public static void execQuery(String uri, String sql, String separator, boolean printHead) throws SQLException{
		try {
			Class.forName(driverName);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			System.exit(1);
		}
		Connection con = DriverManager.getConnection(uri, "", "");
		Statement stmt = con.createStatement();		
		
		ResultSet res = stmt.executeQuery(sql);
		ResultSetMetaData resultSetMetaData = res.getMetaData();
		int columnCount = resultSetMetaData.getColumnCount();
		if( printHead){
			for( int i = 1; i <= columnCount; i++){
				System.out.print(resultSetMetaData.getColumnName(i) + separator);
			}
		}
		while (res.next()) {			
			for( int i = 1; i <= columnCount; i++){
				System.out.print(res.getString(i) + separator);
			}
			System.out.println();
		}
		con.close();
	}
	
	public static boolean execSql(String uri, String sql) throws SQLException{
		try {
			Class.forName(driverName);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			System.exit(1);
		}
		Connection con = DriverManager.getConnection(uri, "", "");
		Statement stmt = con.createStatement();		
		boolean result = stmt.execute(sql);
		con.close();
		
		return result;
	}
	
	public static void main(String[] args) {
		if( args.length < 2){
			System.out.println("Invalid arguments!");
			System.exit(1);
		}
		String uri = args[0];
		String sql = args[1];
		try {
			execQuery(uri, sql, ",", true);
		} catch (SQLException e) {
			e.printStackTrace();
		}
//		try {
//			test(null);
//		} catch (SQLException e) {
//			e.printStackTrace();
//		}
	}
	
	public static void test(String[] args) throws SQLException {
		try {
			Class.forName(driverName);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			System.exit(1);
		}
		Connection con = DriverManager.getConnection(
				"jdbc:hive://m150:10000/default", "", "");
		Statement stmt = con.createStatement();
		String tableName = "testHiveDriverTable";
		stmt.executeQuery("drop table " + tableName);
		ResultSet res = stmt.executeQuery("create table " + tableName
				+ " (key int, value string) row format delimited fields terminated by ','");
		// show tables
		String sql = "show tables '" + tableName + "'";
		System.out.println("Running: " + sql);
		res = stmt.executeQuery(sql);
		if (res.next()) {
			System.out.println(res.getString(1));
		}
		// describe table
		sql = "describe " + tableName;
		System.out.println("Running: " + sql);
		res = stmt.executeQuery(sql);
		while (res.next()) {
			System.out.println(res.getString(1) + "\t" + res.getString(2));
		}

		// load data into table
		// NOTE: filepath has to be local to the hive server
		// NOTE: /tmp/a.txt is a ctrl-A separated file with two fields per line
		String filepath = "/opt/zptest/a.txt";
		sql = "load data local inpath '" + filepath + "' into table "
				+ tableName;
		System.out.println("Running: " + sql);
		res = stmt.executeQuery(sql);

		// select * query
		sql = "select * from " + tableName;
		System.out.println("Running: " + sql);
		res = stmt.executeQuery(sql);
		while (res.next()) {
			System.out.println(String.valueOf(res.getInt(1)) + "\t"
					+ res.getString(2));
		}

		// regular hive query
		sql = "select count(1) from " + tableName;
		System.out.println("Running: " + sql);
		res = stmt.executeQuery(sql);
		while (res.next()) {
			System.out.println(res.getString(1));
		}
	}
}