package haflow.module;

public enum DataType {
	PlainText, Csv, Arff, Image, Jpg, Model, ALL, AUTO;
	
	public static boolean matches(DataType sourceDataType, DataType targetDataType){
		if( sourceDataType == DataType.AUTO || targetDataType == DataType.AUTO){
			System.out.println("Error: AUTO datatype");
			return false;
		}
		if( sourceDataType == targetDataType )
			return true;
		
		if( contains(targetDataType, sourceDataType))
			return true;

		return false;
	}
	
	private static boolean contains(DataType targetDataType, DataType sourceDataType){
		if( targetDataType == DataType.ALL)
			return true;
		
		if( targetDataType == PlainText){
			if( sourceDataType == Csv || sourceDataType == Arff)
				return true;
		}
		
		if( targetDataType == Image){
			if( sourceDataType == Jpg)
				return true;
		}
		return false;
	}
}
